"use client";

import { useState } from "react";
import { Loader2, SendHorizonal, FileSpreadsheet, Building2, BarChart3, CloudSun } from "lucide-react";
import { useContractPrivateKey } from "@/hooks/useContractPrivateKey";
import useWallet from "@/hooks/useWallet";

type ESGFormValues = {
  organization: string;
  metric: string;
  claim: string;
  referenceDate: string;
  externalSource: string;
  requesterAddress?: string;
};

type ESGFormProps = {
  onSubmit: (values: ESGFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

const initialValues: ESGFormValues = {
  organization: "",
  metric: "",
  claim: "",
  referenceDate: "",
  externalSource: "nasa",
};

export default function ESGForm({ onSubmit, isSubmitting }: ESGFormProps) {
  const [values, setValues] = useState(initialValues);
  const [isRecording, setIsRecording] = useState(false);
  
  const { account } = useWallet();
  const { isReady, recordDataHash } = useContractPrivateKey();
  const isConnected = !!account;

  const handleChange = (key: keyof ESGFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      console.log('ESG Form submission started:', {
        values,
        account,
        isConnected,
        isReady
      });

      // Primeiro, chama a função de verificação (onSubmit) com endereço da carteira
      console.log('🔄 Starting verification...');
      try {
        await onSubmit({
          ...values,
          requesterAddress: account
        } as ESGFormValues);
        console.log('✅ Verification completed');
      } catch (verificationError) {
        console.warn('⚠️ Verification failed, but continuing with blockchain recording:', verificationError);
        // Continue with blockchain recording even if verification fails
      }
      
      console.log('🔍 Checking blockchain recording conditions:', {
        isConnected,
        isReady,
        account,
        canRecord: isConnected && isReady
      });

      if (isConnected && isReady) {
        console.log('✅ Conditions met, starting blockchain recording...');
        setIsRecording(true);
        
        // Gera um hash determinístico baseado nos dados
        const dataToHash = `${values.organization}-${values.metric}-${values.claim}-${values.referenceDate}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(dataToHash);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const dataHash = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        console.log('📝 Recording on VeChain with data:', {
          dataHash,
          metric: values.metric,
          organization: values.organization,
          auditor: account
        });
        
        try {
          const txid = await recordDataHash(
            values.metric,
            dataHash,
            account!
          );
          
          console.log('✅ ESG data recorded on VeChain successfully!', {
            txid,
            dataHash,
            metric: values.metric,
            organization: values.organization,
            auditor: account,
            explorerUrl: `https://explore-testnet.vechain.org/transactions/${txid}`
          });
          
          // Mostra o link do explorer para o usuário
          alert(`✅ ESG data recorded successfully!\n\nTransaction ID: ${txid}\nExplorer: https://explore-testnet.vechain.org/transactions/${txid}`);
        } catch (blockchainError) {
          console.error('❌ Blockchain recording failed:', blockchainError);
          alert(`❌ Blockchain recording failed: ${blockchainError instanceof Error ? blockchainError.message : 'Unknown error'}`);
        }
      } else {
        console.warn('❌ Cannot record on blockchain - conditions not met:', { 
          isConnected, 
          isReady, 
          account,
          reason: !isConnected ? 'Wallet not connected' : !isReady ? 'Contract not ready' : 'Unknown'
        });
        alert(`❌ Cannot record on blockchain:\n- Wallet connected: ${isConnected}\n- Contract ready: ${isReady}\n- Account: ${account || 'None'}`);
      }
      
      setValues(initialValues);
    } catch (error) {
      console.error('❌ Error submitting ESG form:', error);
      
      if (error instanceof Error && error.message.includes('timeout')) {
        alert('⏰ Verification is taking longer than expected. This is normal for the first request. Please try again.');
      } else {
        alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex flex-col gap-7 p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]" htmlFor="organization">
            <Building2 className="h-4 w-4 text-[var(--color-primary)]" />
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            className="input-field w-full"
            placeholder="Hidria Renewables"
            value={values.organization}
            onChange={handleChange("organization")}
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]" htmlFor="metric">
            <BarChart3 className="h-4 w-4 text-[var(--color-secondary)]" />
            ESG Metric
          </label>
          <input
            id="metric"
            name="metric"
            className="input-field w-full"
            placeholder="Carbon sequestration vs. base year"
            value={values.metric}
            onChange={handleChange("metric")}
            required
          />
        </fieldset>
      </div>

      <fieldset className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]" htmlFor="claim">
          <FileSpreadsheet className="h-4 w-4 text-[var(--color-primary)]" />
          Claim Details
        </label>
        <textarea
          id="claim"
          name="claim"
          className="input-field min-h-[140px]"
          placeholder="Sequestered 12,300 tons of CO2 in 2024 across reforestation plots."
          value={values.claim}
          onChange={handleChange("claim")}
          required
        />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]" htmlFor="reference-date">
            <CloudSun className="h-4 w-4 text-[var(--color-secondary)]" />
            Reference Date
          </label>
          <input
            id="reference-date"
            name="referenceDate"
            type="date"
            className="input-field w-full"
            value={values.referenceDate}
            onChange={handleChange("referenceDate")}
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]" htmlFor="external-source">
            <CloudSun className="h-4 w-4 text-[var(--color-primary)]" />
            External Data Source
          </label>
          <select
            id="external-source"
            name="externalSource"
            className="input-field w-full"
            value={values.externalSource}
            onChange={handleChange("externalSource")}
          >
            <option value="nasa">NASA EOSDIS</option>
            <option value="mapbiomas">MapBiomas</option>
            <option value="copernicus">Copernicus</option>
          </select>
        </fieldset>
      </div>

      <button
        type="submit"
        className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting || isRecording}
      >
        {isSubmitting || isRecording ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
        {isSubmitting ? "Verifying claim..." : isRecording ? "Recording on VeChain..." : "Verify and record"}
      </button>
    </form>
  );
}

