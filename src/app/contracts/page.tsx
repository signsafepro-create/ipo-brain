'use client';
import { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, FileText, Sparkles, Copy, Check, Scale, Clock } from 'lucide-react';

interface ClauseFinding {
  title: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'SAFE';
  section: string;
  excerpt: string;
  explanation: string;
  recommendation: string;
}

const PRESET_CONTRACTS = [
  {
    name: 'B2B SaaS Master Services Agreement (High Risk)',
    type: 'SaaS Agreement',
    text: `MASTER SERVICES AGREEMENT
1. SERVICES & FEES
Customer agrees to pay all monthly fees. Overdue payments accrue interest at 2.5% per month. 
Fees are strictly non-refundable under all circumstances, including total service downtime.

2. TERM & TERMINATION
This Agreement shall automatically renew for successive 24-month periods unless Customer provides written notice of termination via certified courier at least ninety (90) days prior to renewal. Provider may terminate immediately without cause.

3. INTELLECTUAL PROPERTY & DATA
Customer grants Provider a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, modify, and commercialize all Customer Data and derivative outputs for any commercial purpose.

4. INDEMNIFICATION & LIABILITY
Customer shall defend, indemnify, and hold harmless Provider against all claims, damages, and legal fees. 
Provider's total aggregate liability for all claims arising out of this agreement shall in no event exceed ten dollars ($10.00). Customer's liability is strictly uncapped.

5. NON-COMPETE & RESTRICTIVE COVENANTS
Customer agrees not to develop, market, or invest in any competing software solution globally for a period of three (3) years following termination of this Agreement.`,
    riskScore: 88,
    findings: [
      {
        title: 'Uncapped One-Way Indemnification',
        riskLevel: 'HIGH',
        section: 'Section 4 (Indemnification)',
        excerpt: "Customer's liability is strictly uncapped. Provider's total liability shall not exceed $10.00.",
        explanation: 'Extreme asymmetry. You bear full financial exposure while the vendor limits damages to a nominal ten-dollar token.',
        recommendation: 'Cap customer liability to 12 months fees paid; mandate mutual indemnification only for gross negligence and IP infringement.'
      },
      {
        title: 'Predatory Auto-Renewal Window',
        riskLevel: 'HIGH',
        section: 'Section 2 (Term & Termination)',
        excerpt: 'Automatically renew for successive 24-month periods unless 90-day certified courier notice is provided.',
        explanation: 'Lock-in trap. Missing the 90-day physical courier window binds your company to a mandatory 2-year non-refundable extension.',
        recommendation: 'Change to 12-month renewal with 30-day email notice requirement and mutual termination for convenience.'
      },
      {
        title: 'Overreaching Data Expropriation',
        riskLevel: 'HIGH',
        section: 'Section 3 (IP & Data)',
        excerpt: 'Customer grants Provider a perpetual, irrevocable license to commercialize Customer Data.',
        explanation: 'Forfeits confidential proprietary datasets and customer records to the vendor for their own commercial gain.',
        recommendation: 'Strike commercial license. Limit data access strictly to providing the contracted service, with complete return/destruction upon termination.'
      },
      {
        title: 'Unreasonable Post-Termination Non-Compete',
        riskLevel: 'MEDIUM',
        section: 'Section 5 (Restrictive Covenants)',
        excerpt: 'Agree not to develop, market, or invest in competing software globally for 3 years.',
        explanation: 'Restricts your core business operations and investments across the entire sector for an excessive duration.',
        recommendation: 'Completely remove the non-compete clause; vendor customer relationships do not warrant non-competition covenants.'
      }
    ]
  },
  {
    name: 'Mutual Non-Disclosure Agreement (Standard)',
    type: 'Mutual NDA',
    text: `MUTUAL NONDISCLOSURE AGREEMENT
1. CONFIDENTIAL INFORMATION
"Confidential Information" includes all non-public information disclosed by either Party, whether oral or written, marked as confidential or that reasonably should be understood to be confidential.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to protect Confidential Information using the same degree of care as its own proprietary data, but no less than reasonable care. Information shall only be disclosed to employees and contractors with a strict need to know.

3. EXCLUSIONS
Confidential Information does not include information that: (a) is or becomes public knowledge without breach; (b) was known prior to disclosure; (c) is independently developed without reference to Confidential Information.

4. TERM & SURVIVAL
This Agreement remains in effect for two (2) years from the Effective Date. Trade secret obligations survive indefinitely under applicable law.

5. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware, without regard to conflicts of law principles.`,
    riskScore: 22,
    findings: [
      {
        title: 'Symmetrical Mutual Protections',
        riskLevel: 'SAFE',
        section: 'Section 1 & 2 (Confidentiality)',
        excerpt: 'Protect using the same degree of care as own proprietary data... strictly need to know.',
        explanation: 'Balanced two-way obligation protecting both parties equally without unilateral advantage.',
        recommendation: 'Clause aligns with international commercial standards. Acceptable as written.'
      },
      {
        title: 'Standard Knowledge Carve-Outs',
        riskLevel: 'SAFE',
        section: 'Section 3 (Exclusions)',
        excerpt: 'Excludes public knowledge, prior knowledge, and independent development.',
        explanation: 'Ensures existing institutional knowledge and public domain items cannot be claimed as protected disclosures.',
        recommendation: 'Optimal standard clause.'
      },
      {
        title: 'Reasonable 2-Year Sunset Period',
        riskLevel: 'SAFE',
        section: 'Section 4 (Term & Survival)',
        excerpt: 'Remains in effect for two (2) years. Trade secrets survive indefinitely.',
        explanation: 'Prevents indefinite commercial restraint while properly securing core trade secrets.',
        recommendation: 'Standard acceptable horizon.'
      }
    ]
  }
];

export default function ContractsPage() {
  const [contractText, setContractText] = useState(PRESET_CONTRACTS[0].text);
  const [currentContractName, setCurrentContractName] = useState(PRESET_CONTRACTS[0].name);
  const [riskScore, setRiskScore] = useState(PRESET_CONTRACTS[0].riskScore);
  const [findings, setFindings] = useState<ClauseFinding[]>(PRESET_CONTRACTS[0].findings as ClauseFinding[]);
  const [isScanning, setIsScanning] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSelectPreset = (idx: number) => {
    const selected = PRESET_CONTRACTS[idx];
    setCurrentContractName(selected.name);
    setContractText(selected.text);
    setRiskScore(selected.riskScore);
    setFindings(selected.findings as ClauseFinding[]);
  };

  const handleScan = () => {
    if (!contractText.trim()) return;
    setIsScanning(true);

    setTimeout(() => {
      const lower = contractText.toLowerCase();
      let computedScore = 30;
      const computedFindings: ClauseFinding[] = [];

      if (lower.includes('uncapped') || lower.includes('indemnify') || lower.includes('hold harmless')) {
        computedScore += 25;
        computedFindings.push({
          title: 'Indemnity & Liability Allocation',
          riskLevel: lower.includes('uncapped') ? 'HIGH' : 'MEDIUM',
          section: 'Indemnification Terms',
          excerpt: 'Clauses referencing indemnification and liability caps identified in text.',
          explanation: 'Indemnity clauses can shift unlimited third-party damages onto your business.',
          recommendation: 'Ensure liability is mutually capped at 1-2x annual contract value with standard carve-outs.'
        });
      }

      if (lower.includes('automatic') || lower.includes('renew') || lower.includes('90 days') || lower.includes('certified')) {
        computedScore += 20;
        computedFindings.push({
          title: 'Renewal / Lock-in Mechanics',
          riskLevel: 'MEDIUM',
          section: 'Term & Renewal',
          excerpt: 'Automatic renewal provisions detected.',
          explanation: 'Auto-renewal clauses can lock you into future billing cycles if notice deadlines are missed.',
          recommendation: 'Require vendor to send written reminder 30 days prior to notice cut-off date.'
        });
      }

      if (lower.includes('perpetual') || lower.includes('irrevocable') || lower.includes('license to use') || lower.includes('customer data')) {
        computedScore += 20;
        computedFindings.push({
          title: 'Data Ownership & IP Grant',
          riskLevel: 'HIGH',
          section: 'IP Rights',
          excerpt: 'Broad license grants over user/customer data detected.',
          explanation: 'Could permit the vendor to train competitor models or commercialize your proprietary information.',
          recommendation: 'Explicitly state that Customer retains all right, title, and interest in and to Customer Data.'
        });
      }

      if (computedFindings.length === 0) {
        computedScore = 15;
        computedFindings.push({
          title: 'Baseline Standard Agreement',
          riskLevel: 'SAFE',
          section: 'General Terms',
          excerpt: 'No predatory or high-risk language patterns identified.',
          explanation: 'Agreement language reflects standard bilateral business terms.',
          recommendation: 'Review specific commercial values, deliverables, and payment milestones.'
        });
      }

      setRiskScore(Math.min(95, computedScore));
      setFindings(computedFindings);
      setIsScanning(false);
    }, 800);
  };

  const handleCopyRec = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score > 70) return 'text-red-400 border-red-500/40 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]';
    if (score > 40) return 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)]';
    return 'text-[#00ffcc] border-[#00ffcc]/40 bg-[#00ffcc]/10 shadow-[0_0_30px_rgba(0,255,204,0.2)]';
  };

  const getScoreBadge = (score: number) => {
    if (score > 70) return 'HIGH RISK — DO NOT SIGN WITHOUT REDLINES';
    if (score > 40) return 'MODERATE RISK — REVISION RECOMMENDED';
    return 'LOW RISK — BALANCED COMMERCIAL TERMS';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30">
              <ShieldCheck className="w-8 h-8 text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Sign<span className="text-[#00ffcc]">Safe</span> AI Contract Risk Scanner
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Autonomous legal risk intelligence. Detect predatory clauses, indemnification exposure, and hidden traps in seconds.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-gray-500 mr-1">Load Preset:</span>
          {PRESET_CONTRACTS.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(idx)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                currentContractName === preset.name
                  ? 'bg-white/15 text-white border-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.2)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {preset.type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contract Editor & Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col h-[650px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00ffcc]" /> Contract Agreement Text
              </span>
              <span className="text-xs font-mono text-gray-500">
                {contractText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste contract agreement, NDA, MSA, or employment terms here..."
              className="flex-1 w-full bg-black/60 border border-white/15 rounded-xl p-4 text-xs font-mono text-gray-200 leading-relaxed focus:outline-none focus:border-[#00ffcc] transition-colors resize-none mb-4"
            />

            <button
              onClick={handleScan}
              disabled={isScanning || !contractText.trim()}
              className="w-full py-3.5 bg-[#00ffcc] disabled:bg-[#00ffcc]/40 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#00ccaa] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,204,0.3)] disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Scanning Clauses & Liabilities...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Run Autonomous Risk Scan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Risk Telemetry & Findings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Risk Score Banner */}
          <div className={`glass-panel rounded-2xl p-6 border ${getScoreColor(riskScore)} flex flex-col sm:flex-row items-center justify-between gap-6`}>
            <div className="flex items-center gap-5">
              <div className="text-5xl font-black font-mono">
                {riskScore}<span className="text-xl font-normal opacity-70">/100</span>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest opacity-80">Aggregate Risk Rating</p>
                <p className="text-sm font-bold mt-1 text-white">{getScoreBadge(riskScore)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <span className="text-gray-400 block">Critical Flags</span>
                <span className="text-red-400 font-bold text-base">
                  {findings.filter(f => f.riskLevel === 'HIGH').length}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Caution Items</span>
                <span className="text-amber-400 font-bold text-base">
                  {findings.filter(f => f.riskLevel === 'MEDIUM').length}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Safe Clauses</span>
                <span className="text-[#00ffcc] font-bold text-base">
                  {findings.filter(f => f.riskLevel === 'SAFE').length}
                </span>
              </div>
            </div>
          </div>

          {/* Clause Analysis Stream */}
          <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#00ffcc]" /> Redline Findings & Executive Guidance
            </h3>

            {findings.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {item.riskLevel === 'HIGH' && <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                    {item.riskLevel === 'MEDIUM' && <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    {item.riskLevel === 'SAFE' && <CheckCircle className="w-4 h-4 text-[#00ffcc] flex-shrink-0" />}
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                      item.riskLevel === 'HIGH'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : item.riskLevel === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/30'
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>

                <div className="text-xs font-mono text-gray-400 bg-black/40 p-2.5 rounded-lg border border-white/5 italic">
                  &ldquo;{item.excerpt}&rdquo;
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="text-white font-semibold">Risk Analysis:</span> {item.explanation}
                </p>

                <div className="bg-[#00ffcc]/5 border border-[#00ffcc]/20 rounded-lg p-3 flex items-start justify-between gap-3">
                  <div className="text-xs text-[#00ffcc] leading-relaxed">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-gray-400 mb-1">
                      Recommended Redline:
                    </span>
                    {item.recommendation}
                  </div>
                  <button
                    onClick={() => handleCopyRec(item.recommendation, idx)}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                    title="Copy Redline"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
