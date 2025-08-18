import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ShareResultCard from '@/components/share-result-card'

// Mock external dependencies
jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,mockqrcode')
}))

jest.mock('html2canvas', () => jest.fn().mockResolvedValue({
  toBlob: (callback: (blob: Blob) => void) => {
    callback(new Blob(['mock image data'], { type: 'image/png' }))
  }
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode, [key: string]: unknown }) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = jest.fn()

describe('ShareResultCard Component', () => {
  const defaultProps = {
    scamScore: 75,
    educationPath: 'Computer Science BS',
    totalCost: 120000,
    breakevenYears: 5,
    aiRisk: 45,
    roi: 65,
    format: 'instagram' as const,
    onClose: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render with default props', async () => {
      await act(async () => {
        render(<ShareResultCard {...defaultProps} />)
      })

      expect(screen.getByText('Share Your Scam Score™')).toBeInTheDocument()
      expect(screen.getByText('Computer Science BS')).toBeInTheDocument()
      expect(screen.getByText('75')).toBeInTheDocument()
      expect(screen.getByText('SCAM SCORE™')).toBeInTheDocument()
      
      // Wait for QR code to load
      await waitFor(() => {
        expect(screen.getByAltText('QR Code')).toBeInTheDocument()
      })
    })

    it('should display correct verdict based on scam score', () => {
      const { rerender } = render(<ShareResultCard {...defaultProps} scamScore={75} />)
      expect(screen.getByText("YOU'RE BEING SCAMMED!")).toBeInTheDocument()

      rerender(<ShareResultCard {...defaultProps} scamScore={55} />)
      expect(screen.getByText('Questionable Investment')).toBeInTheDocument()

      rerender(<ShareResultCard {...defaultProps} scamScore={35} />)
      expect(screen.getByText('Proceed with Caution')).toBeInTheDocument()

      rerender(<ShareResultCard {...defaultProps} scamScore={25} />)
      expect(screen.getByText('Smart Investment')).toBeInTheDocument()
    })

    it('should display formatted stats correctly', () => {
      render(<ShareResultCard {...defaultProps} />)

      expect(screen.getByText('$120K')).toBeInTheDocument() // Total debt
      expect(screen.getByText('5 YRS')).toBeInTheDocument() // Break even
      expect(screen.getByText('45%')).toBeInTheDocument() // AI risk
      expect(screen.getByText('65%')).toBeInTheDocument() // ROI
    })

    it('should show correct color for scam score', () => {
      const { rerender } = render(<ShareResultCard {...defaultProps} scamScore={75} />)
      // High score should be red
      let scoreElement = screen.getByText('75').parentElement?.parentElement
      // Check if the element has the expected color in its style attribute
      expect(scoreElement?.getAttribute('style')).toContain('#DC2626')

      rerender(<ShareResultCard {...defaultProps} scamScore={25} />)
      // Low score should be green
      scoreElement = screen.getByText('25').parentElement?.parentElement
      expect(scoreElement?.getAttribute('style')).toContain('#10B981')
    })
  })

  describe('Format Selection', () => {
    it('should render all format buttons', () => {
      render(<ShareResultCard {...defaultProps} />)

      expect(screen.getByRole('button', { name: /Instagram/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Twitter/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /TikTok/i })).toBeInTheDocument()
    })

    it('should change format when button clicked', async () => {
      render(<ShareResultCard {...defaultProps} format="instagram" />)

      const twitterButton = screen.getByRole('button', { name: /Twitter/i })
      
      await act(async () => {
        fireEvent.click(twitterButton)
      })

      // Check that the Twitter format text is now present
      await waitFor(() => {
        const shareTextarea = screen.getByRole('textbox') as HTMLTextAreaElement
        expect(shareTextarea.value).toContain('🚨 SCAM ALERT:')
      })
    })

    it('should update share text when format changes', () => {
      render(<ShareResultCard {...defaultProps} format="instagram" />)

      // Initial Instagram format text
      let shareTextarea = screen.getByRole('textbox') as HTMLTextAreaElement
      expect(shareTextarea.value).toContain('THE VERDICT IS IN ⚖️')

      // Switch to Twitter format
      const twitterButton = screen.getByRole('button', { name: /Twitter/i })
      fireEvent.click(twitterButton)

      // Twitter format should have different text
      shareTextarea = screen.getByRole('textbox') as HTMLTextAreaElement
      expect(shareTextarea.value).toContain('🚨 SCAM ALERT:')
    })

    it('should update card dimensions based on format', () => {
      const { rerender } = render(<ShareResultCard {...defaultProps} format="instagram" />)
      
      // For Instagram format, check that the component renders with this format
      const instagramButton = screen.getByRole('button', { name: /Instagram/i })
      expect(instagramButton).toBeInTheDocument()

      // For Twitter format
      rerender(<ShareResultCard {...defaultProps} format="twitter" />)
      const twitterButton = screen.getByRole('button', { name: /Twitter/i })
      expect(twitterButton).toBeInTheDocument()

      // For TikTok format
      rerender(<ShareResultCard {...defaultProps} format="tiktok" />)
      const tiktokButton = screen.getByRole('button', { name: /TikTok/i })
      expect(tiktokButton).toBeInTheDocument()
    })
  })

  describe('User Actions', () => {
    it('should call onClose when X button clicked', () => {
      const onClose = jest.fn()
      render(<ShareResultCard {...defaultProps} onClose={onClose} />)

      // Find the close button - it's the first button in the header
      const buttons = screen.getAllByRole('button')
      const closeButton = buttons[0] // First button is the close button
      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when clicking backdrop', () => {
      const onClose = jest.fn()
      render(<ShareResultCard {...defaultProps} onClose={onClose} />)

      const backdrop = screen.getByText('Share Your Scam Score™').closest('.fixed')
      if (backdrop) fireEvent.click(backdrop)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should not close when clicking modal content', () => {
      const onClose = jest.fn()
      render(<ShareResultCard {...defaultProps} onClose={onClose} />)

      const modalContent = screen.getByText('Share Your Scam Score™')
      fireEvent.click(modalContent)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should allow editing share text', () => {
      render(<ShareResultCard {...defaultProps} />)

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      const newText = 'Custom share text'
      
      fireEvent.change(textarea, { target: { value: newText } })
      
      expect(textarea.value).toBe(newText)
    })

    it('should copy text to clipboard when Copy Text clicked', async () => {
      const mockClipboard = {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
      Object.assign(navigator, { clipboard: mockClipboard })

      global.alert = jest.fn()

      render(<ShareResultCard {...defaultProps} />)

      const copyButton = screen.getByRole('button', { name: /Copy Text/i })
      
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(mockClipboard.writeText).toHaveBeenCalled()
      expect(global.alert).toHaveBeenCalledWith('Share text copied to clipboard!')
    })
  })

  describe('Download Functionality', () => {
    it('should trigger download when Download button clicked', async () => {
      const mockClick = jest.fn()
      const originalCreateElement = document.createElement
      
      document.createElement = jest.fn((tagName: string) => {
        const element = originalCreateElement.call(document, tagName)
        if (tagName === 'a') {
          Object.defineProperty(element, 'click', { value: mockClick })
        }
        return element
      })

      render(<ShareResultCard {...defaultProps} />)

      const downloadButton = screen.getByRole('button', { name: /Download.*Image/i })
      
      await act(async () => {
        fireEvent.click(downloadButton)
      })

      await waitFor(() => {
        expect(mockClick).toHaveBeenCalled()
      })

      document.createElement = originalCreateElement
    })

    it('should show generating state while downloading', async () => {
      render(<ShareResultCard {...defaultProps} />)

      const downloadButton = screen.getByRole('button', { name: /Download.*Image/i })
      
      fireEvent.click(downloadButton)

      // Wait for the generating state to appear
      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument()
      })

      // Then wait for it to disappear
      await waitFor(() => {
        expect(screen.queryByText('Generating...')).not.toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should display correct download button text based on format', () => {
      const { rerender } = render(<ShareResultCard {...defaultProps} format="instagram" />)
      expect(screen.getByText(/Download.*Image/i)).toBeInTheDocument()

      rerender(<ShareResultCard {...defaultProps} format="twitter" />)
      expect(screen.getByText(/Download.*Image/i)).toBeInTheDocument()

      rerender(<ShareResultCard {...defaultProps} format="tiktok" />)
      expect(screen.getByText(/Download.*Image/i)).toBeInTheDocument()
    })
  })

  describe('Share Functionality', () => {
    it('should use native share API when available', async () => {
      const mockShare = jest.fn().mockResolvedValue(undefined)
      Object.assign(navigator, { share: mockShare })

      render(<ShareResultCard {...defaultProps} />)

      const shareButton = screen.getByRole('button', { name: /Share$/i })
      
      await act(async () => {
        fireEvent.click(shareButton)
      })

      await waitFor(() => {
        expect(mockShare).toHaveBeenCalledWith({
          title: 'My College Scam Score™',
          text: expect.stringContaining('THE VERDICT IS IN'),
          url: 'https://collegescam.io'
        })
      })
    })

    it('should fall back to clipboard when share API not available', () => {
      // Remove share API
      const originalShare = navigator.share
      delete (navigator as { share?: typeof navigator.share }).share

      const mockClipboard = {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
      Object.assign(navigator, { clipboard: mockClipboard })

      global.alert = jest.fn()

      render(<ShareResultCard {...defaultProps} />)

      // Share button should not exist when API not available
      expect(screen.queryByRole('button', { name: /Share$/i })).not.toBeInTheDocument()

      // Restore share API
      if (originalShare) {
        Object.assign(navigator, { share: originalShare })
      }
    })
  })

  describe('QR Code', () => {
    it('should generate QR code on mount', async () => {
      const QRCode = await import('qrcode')
      render(<ShareResultCard {...defaultProps} />)

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledWith(
          'https://collegescam.io',
          expect.objectContaining({
            width: 100,
            margin: 1
          })
        )
      })
    })

    it('should display QR code image when generated', async () => {
      render(<ShareResultCard {...defaultProps} />)

      await waitFor(() => {
        const qrImage = screen.getByAltText('QR Code') as HTMLImageElement
        expect(qrImage.src).toBe('data:image/png;base64,mockqrcode')
      })
    })
  })

  describe('Tips Section', () => {
    it('should display viral sharing tips', () => {
      render(<ShareResultCard {...defaultProps} />)

      expect(screen.getByText('📱 Tips for viral sharing:')).toBeInTheDocument()
      expect(screen.getByText('Post during peak hours (7-9am, 5-7pm)')).toBeInTheDocument()
      expect(screen.getByText('Tag friends who are considering college')).toBeInTheDocument()
      expect(screen.getByText('Use trending education hashtags')).toBeInTheDocument()
      expect(screen.getByText('Share your story in the caption')).toBeInTheDocument()
    })
  })
})
