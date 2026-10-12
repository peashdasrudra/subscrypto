'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, QrCode, ArrowRight, ShieldCheck, Smartphone, AlertCircle, Info, ExternalLink } from 'lucide-react';
import QRCodeLib from 'qrcode';
import type { PaymentMethod } from '@/lib/types';

const RECIPIENT = '01533679773';
const AMOUNT = '349';

const methods: { id: PaymentMethod; label: string; color: string; bgBadge: string }[] = [
  { id: 'bKash', label: 'bKash', color: '#E2136E', bgBadge: 'bg-[#E2136E]/15 text-[#E2136E] border-[#E2136E]/30' },
  { id: 'Nagad', label: 'Nagad', color: '#F6921E', bgBadge: 'bg-[#F6921E]/15 text-[#F6921E] border-[#F6921E]/30' },
  { id: 'Rocket', label: 'Rocket', color: '#A855F7', bgBadge: 'bg-[#8C338C]/15 text-[#D88FD8] border-[#8C338C]/30' },
];

interface PaymentInstructionsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export default function PaymentInstructions({
  selectedMethod,
  onMethodChange,
}: PaymentInstructionsProps) {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    // Generate QR code for mobile scanning
    const qrPayload = `${selectedMethod}:01533679773?amount=349`;
    QRCodeLib.toDataURL(qrPayload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#030712',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [selectedMethod]);

  const copyToClipboard = async (text: string, type: 'number' | 'amount') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'number') {
        setCopiedNumber(true);
        setTimeout(() => setCopiedNumber(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      if (type === 'number') {
        setCopiedNumber(true);
        setTimeout(() => setCopiedNumber(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
    }
  };

  const getMethodGuidance = (method: PaymentMethod) => {
    switch (method) {
      case 'bKash':
        return [
          'Open your bKash app and tap "Send Money" (সেন্ড মানি).',
          `Enter recipient number: ${RECIPIENT} (Personal).`,
          `Enter exact amount: ৳${AMOUNT} BDT.`,
          'Put reference: "AI PRO" or your name.',
          'Confirm with your bKash PIN.',
          'Copy the Transaction ID (TrxID) shown on confirmation.',
        ];
      case 'Nagad':
        return [
          'Open your Nagad app and select "Send Money" (সেন্ড মানি).',
          `Enter recipient number: ${RECIPIENT}.`,
          `Enter exact amount: ৳${AMOUNT} BDT.`,
          'Put reference: "AI PRO".',
          'Enter your Nagad PIN and tap & hold to confirm.',
          'Copy the 8-character Transaction ID.',
        ];
      case 'Rocket':
        return [
          'Open your Rocket app or dial *322#.',
          'Choose "Send Money" option.',
          `Enter recipient number: ${RECIPIENT}.`,
          `Enter exact amount: ৳${AMOUNT} BDT.`,
          'Confirm the transfer with your Rocket PIN.',
          'Note down the Transaction ID from the SMS confirmation.',
        ];
    }
  };

  return (
    <div className="glass-panel-elevated p-5 sm:p-7 md:p-8 border border-white/[0.12] rounded-2xl sm:rounded-3xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
            Step 1 of 2 · Mobile Payment
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Send ৳{AMOUNT} BDT to Recipient
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Choose your wallet, copy details, and transfer before submitting.
          </p>
        </div>

        {/* QR Code Quick Button */}
        <button
          onClick={() => setShowQrModal(!showQrModal)}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors self-start sm:self-auto active:scale-95 cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-cyan-400" />
          <span>{showQrModal ? 'Hide QR Code' : 'Scan via QR'}</span>
        </button>
      </div>

      {/* Payment Method Selector Tabs - Thumb-friendly buttons */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 font-mono">
          Select Your Payment Method
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5" role="tablist">
          {methods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onMethodChange(method.id)}
                className={`py-3 sm:py-3.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 border cursor-pointer active:scale-95 ${
                  isSelected
                    ? `${method.bgBadge} shadow-[0_0_20px_rgba(0,0,0,0.4)]`
                    : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Value Cards (Amount + Recipient) - Mobile First Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        
        {/* Card 1: Amount */}
        <div className="p-4 rounded-xl sm:rounded-2xl bg-navy-950/90 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
              Exact Amount
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                ৳{AMOUNT}
              </span>
              <span className="text-xs text-slate-400 font-medium">BDT</span>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(AMOUNT, 'amount')}
            className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
            aria-label="Copy exact amount"
          >
            {copiedAmount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedAmount ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Card 2: Recipient Number */}
        <div className="p-4 rounded-xl sm:rounded-2xl bg-navy-950/90 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
              Recipient (Send Money)
            </span>
            <span className="text-base sm:text-lg font-bold text-white font-mono tracking-wider">
              {RECIPIENT}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(RECIPIENT, 'number')}
            className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 active:scale-95 text-xs font-semibold text-indigo-300 transition-all cursor-pointer"
            aria-label="Copy recipient phone number"
          >
            {copiedNumber ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-300" />}
            <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

      </div>

      {/* QR Code Reveal (Collapsible / Dynamic) */}
      {showQrModal && qrDataUrl && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-navy-950/95 border border-indigo-500/30 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 animate-fade-in text-center sm:text-left">
          <div className="p-2.5 bg-white rounded-xl shadow-xl flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt={`${selectedMethod} QR Code`} className="w-32 h-32 sm:w-36 sm:h-36 rounded" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
              <QrCode className="w-4 h-4 text-cyan-400" />
              Scan from {selectedMethod} App
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Scan directly from your wallet app on another device, or copy the recipient number above.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span>{RECIPIENT} · ৳{AMOUNT} BDT</span>
            </div>
          </div>
        </div>
      )}

      {/* Step by Step Directions for Selected Method */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07]">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            {selectedMethod} Steps
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">Personal Account</span>
        </div>

        <ol className="space-y-2">
          {getMethodGuidance(selectedMethod).map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-cyan-400 text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Security Reassurance Callout */}
      <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Save your Transaction ID from the SMS or app receipt for the form below.</span>
      </div>

    </div>
  );
}
