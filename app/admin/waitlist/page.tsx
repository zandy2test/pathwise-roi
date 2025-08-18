'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source?: string;
  ip?: string;
}

export default function WaitlistAdminPage() {
  const [emails, setEmails] = useState<WaitlistEntry[]>([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmails = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/waitlist-improved?secret=${password}`);
      
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
        setAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Date', 'Time', 'Source'];
    const rows = emails.map(entry => {
      const date = new Date(entry.timestamp);
      return [
        entry.email,
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        entry.source || 'direct'
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collegescam-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyAllEmails = () => {
    const emailList = emails.map(e => e.email).join(', ');
    navigator.clipboard.writeText(emailList);
    alert('Emails copied to clipboard!');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchEmails()}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              />
              <Button
                onClick={fetchEmails}
                disabled={loading || !password}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? 'Loading...' : 'Access Waitlist'}
              </Button>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <p className="text-gray-400 text-xs text-center">
                Default: collegescam2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Waitlist Dashboard
            </h1>
            <p className="text-gray-400">
              Total signups: {emails.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-700"
              disabled={emails.length === 0}
            >
              Export CSV
            </Button>
            <Button
              onClick={copyAllEmails}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={emails.length === 0}
            >
              Copy Emails
            </Button>
            <Button
              onClick={() => setAuthenticated(false)}
              className="bg-gray-700 hover:bg-gray-600"
            >
              Logout
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            {emails.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No signups yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {emails.map((entry, index) => {
                      const date = new Date(entry.timestamp);
                      return (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-white">
                            {entry.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {date.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {date.toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {entry.source || 'direct'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Access this page at: /admin/waitlist</p>
          <p>API endpoint: /api/waitlist-improved</p>
          <p>View logs in Vercel dashboard for production</p>
        </div>
      </div>
    </div>
  );
}
