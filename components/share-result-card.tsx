'use client'

import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Camera, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ShareResultCardProps {
  scamScore: number
  educationPath: string
  totalCost: number
  breakevenYears: number
  aiRisk: number
  roi: number
  format: 'instagram' | 'twitter' | 'tiktok'
  onClose: () => void
}

export default function ShareResultCard({
  scamScore,
  educationPath,
  totalCost,
  breakevenYears,
  aiRisk,
  roi,
  format: initialFormat,
  onClose
}: ShareResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [format, setFormat] = useState<'instagram' | 'twitter' | 'tiktok'>(initialFormat)
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [shareText, setShareText] = useState('')

  // Generate QR code on mount
  useEffect(() => {
    QRCode.toDataURL('https://collegescamcalculator.com', {
      width: 100,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(setQrCodeUrl).catch(() => {
      // QR code generation failed - silently ignore
    })
  }, [])

  // Generate share text based on format
  useEffect(() => {
    if (format === 'twitter') {
      setShareText(
        `🚨 SCAM ALERT: My ${educationPath} scores ${scamScore}/100 on the Scam Scale™\n\n` +
        `💸 Debt: $${totalCost.toLocaleString()}\n` +
        `⏰ Years to break even: ${breakevenYears}\n` +
        `🤖 AI replacement risk: ${aiRisk}%\n\n` +
        `Is college scamming YOU? Find out:\n` +
        `CollegeScamCalculator.com`
      )
    } else {
      setShareText(
        `THE VERDICT IS IN ⚖️\n\n` +
        `My education path: ${educationPath}\n` +
        `Scam Score™: ${scamScore}/100 ${scamScore > 70 ? '🚨' : scamScore > 40 ? '⚠️' : '✅'}\n` +
        `Total debt: $${totalCost.toLocaleString()}\n` +
        `Time to profit: ${breakevenYears} years\n\n` +
        `${getVerdictText(scamScore)}\n\n` +
        `Link in bio to calculate YOUR scam score 👆\n` +
        `#CollegeScam #StudentDebt #EducationROI #CollegeWorthIt`
      )
    }
  }, [format, scamScore, educationPath, totalCost, breakevenYears, aiRisk])

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#DC2626' // Red
    if (score >= 50) return '#F59E0B' // Yellow
    if (score >= 30) return '#FB923C' // Orange
    return '#10B981' // Green
  }

  const getVerdictText = (score: number) => {
    if (score >= 70) return "YOU'RE BEING SCAMMED!"
    if (score >= 50) return "Questionable Investment"
    if (score >= 30) return "Proceed with Caution"
    return "Smart Investment"
  }

  const getDimensions = () => {
    switch (format) {
      case 'instagram':
        return { width: 1080, height: 1080 }
      case 'twitter':
        return { width: 1200, height: 675 }
      case 'tiktok':
        return { width: 1080, height: 1920 }
      default:
        return { width: 1080, height: 1080 }
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    
    setIsGenerating(true)
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#000000',
        logging: false,
        useCORS: true,
        allowTaint: true
      })
      
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `college-scam-score-${format}-${Date.now()}.png`
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (error) {
      // Failed to generate image - silently handle error
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My College Scam Score™',
          text: shareText,
          url: 'https://collegescamcalculator.com'
        })
      } catch (err) {
        // User cancelled or error occurred
        // Share cancelled or failed - silently handle
      }
    } else {
      // Fallback to copying text
      navigator.clipboard.writeText(shareText)
      alert('Share text copied to clipboard!')
    }
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText)
    alert('Share text copied to clipboard!')
  }

  const dimensions = getDimensions()
  const scale = format === 'tiktok' ? 0.3 : 0.5

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-gray-900 rounded-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white">Share Your Scam Score™</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Format Selector */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={format === 'instagram' ? 'default' : 'outline'}
              onClick={() => setFormat('instagram')}
              className={format === 'instagram' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
            <Button
              variant={format === 'twitter' ? 'default' : 'outline'}
              onClick={() => setFormat('twitter')}
              className={format === 'twitter' ? 'bg-blue-500' : ''}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter/X
            </Button>
            <Button
              variant={format === 'tiktok' ? 'default' : 'outline'}
              onClick={() => setFormat('tiktok')}
              className={format === 'tiktok' ? 'bg-black border-white' : ''}
            >
              <Camera className="h-4 w-4 mr-2" />
              TikTok
            </Button>
          </div>

          {/* Preview Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Share Card Preview */}
            <div className="flex-1 flex justify-center items-center bg-gray-800 rounded-lg p-4">
              <div
                ref={cardRef}
                className="relative bg-gradient-to-br from-black via-red-950 to-black overflow-hidden"
                style={{
                  width: `${dimensions.width * scale}px`,
                  height: `${dimensions.height * scale}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-8" style={{ padding: format === 'tiktok' ? '48px' : '32px' }}>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h1 
                      className="font-black text-white mb-2"
                      style={{ fontSize: format === 'tiktok' ? '42px' : '36px' }}
                    >
                      THE COLLEGE
                    </h1>
                    <h1 
                      className="font-black text-red-500"
                      style={{ fontSize: format === 'tiktok' ? '48px' : '40px' }}
                    >
                      SCAM CALCULATOR
                    </h1>
                  </div>

                  {/* Education Path */}
                  <div className="text-center mb-6">
                    <p className="text-gray-300" style={{ fontSize: format === 'tiktok' ? '24px' : '20px' }}>
                      {educationPath}
                    </p>
                  </div>

                  {/* Scam Score Display */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-8">
                      {/* Score Circle */}
                      <div 
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: format === 'tiktok' ? '280px' : '200px',
                          height: format === 'tiktok' ? '280px' : '200px',
                          backgroundColor: getScoreColor(scamScore),
                          boxShadow: `0 0 60px ${getScoreColor(scamScore)}`
                        }}
                      >
                        <div className="text-center">
                          <div 
                            className="font-black text-white"
                            style={{ fontSize: format === 'tiktok' ? '96px' : '72px' }}
                          >
                            {scamScore}
                          </div>
                          <div 
                            className="font-bold text-white opacity-90"
                            style={{ fontSize: format === 'tiktok' ? '24px' : '18px' }}
                          >
                            SCAM SCORE™
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div 
                      className="font-black text-center mb-8"
                      style={{ 
                        fontSize: format === 'tiktok' ? '42px' : '32px',
                        color: getScoreColor(scamScore)
                      }}
                    >
                      {getVerdictText(scamScore)}
                    </div>

                    {/* Stats Grid */}
                    <div 
                      className={`w-full grid ${format === 'twitter' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 mb-8`}
                      style={{ maxWidth: format === 'tiktok' ? '100%' : '600px' }}
                    >
                      <div className="text-center">
                        <p className="text-gray-400" style={{ fontSize: format === 'tiktok' ? '18px' : '14px' }}>
                          TOTAL DEBT
                        </p>
                        <p 
                          className="font-bold text-red-400"
                          style={{ fontSize: format === 'tiktok' ? '28px' : '20px' }}
                        >
                          ${(totalCost / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400" style={{ fontSize: format === 'tiktok' ? '18px' : '14px' }}>
                          BREAK EVEN
                        </p>
                        <p 
                          className="font-bold text-yellow-400"
                          style={{ fontSize: format === 'tiktok' ? '28px' : '20px' }}
                        >
                          {breakevenYears} YRS
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400" style={{ fontSize: format === 'tiktok' ? '18px' : '14px' }}>
                          AI RISK
                        </p>
                        <p 
                          className="font-bold text-orange-400"
                          style={{ fontSize: format === 'tiktok' ? '28px' : '20px' }}
                        >
                          {aiRisk}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400" style={{ fontSize: format === 'tiktok' ? '18px' : '14px' }}>
                          ROI
                        </p>
                        <p 
                          className={`font-bold ${roi > 50 ? 'text-green-400' : 'text-orange-400'}`}
                          style={{ fontSize: format === 'tiktok' ? '28px' : '20px' }}
                        >
                          {roi.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer with QR and URL */}
                  <div className="flex items-center justify-between">
                    {qrCodeUrl && (
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        style={{ 
                          width: format === 'tiktok' ? '120px' : '80px',
                          height: format === 'tiktok' ? '120px' : '80px'
                        }}
                      />
                    )}
                    <div className="text-right">
                      <p 
                        className="font-bold text-white"
                        style={{ fontSize: format === 'tiktok' ? '24px' : '18px' }}
                      >
                        CollegeScamCalculator.com
                      </p>
                      <p 
                        className="text-gray-400"
                        style={{ fontSize: format === 'tiktok' ? '18px' : '14px' }}
                      >
                        Calculate YOUR scam score
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Text & Actions */}
            <div className="flex-1 space-y-4">
              <Card className="bg-gray-800 border-gray-700 p-4">
                <h3 className="text-white font-bold mb-2">Share Text</h3>
                <textarea
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  className="w-full h-32 bg-gray-900 text-gray-300 p-3 rounded-lg border border-gray-700 resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={handleCopyText}
                    variant="outline"
                    className="flex-1"
                  >
                    Copy Text
                  </Button>
                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  )}
                </div>
              </Card>

              <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4"
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download {format === 'instagram' ? 'Square' : format === 'twitter' ? 'Landscape' : 'Vertical'} Image
                  </>
                )}
              </Button>

              <div className="text-gray-400 text-sm">
                <p>📱 Tips for viral sharing:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Post during peak hours (7-9am, 5-7pm)</li>
                  <li>Tag friends who are considering college</li>
                  <li>Use trending education hashtags</li>
                  <li>Share your story in the caption</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
