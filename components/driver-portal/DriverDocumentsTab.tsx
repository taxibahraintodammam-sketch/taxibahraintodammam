'use client';

import { useState, useEffect } from 'react';
import { Loader2, Upload, FileText } from 'lucide-react';

type DocType = 'license' | 'iqama_id' | 'vehicle_registration' | 'insurance' | 'other';

interface DriverDocument {
    id: string;
    doc_type: DocType;
    document_number?: string;
    expiry_date?: string;
    file_url?: string;
    created_at: string;
}

const DOC_TYPE_META: Record<DocType, string> = {
    license: 'Driving License',
    iqama_id: 'Iqama / ID',
    vehicle_registration: 'Vehicle Registration',
    insurance: 'Insurance',
    other: 'Other',
};

const getExpiryStatus = (expiryDate?: string): { label: string; color: string } | null => {
    if (!expiryDate) return null;
    const days = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: `Expired ${Math.abs(days)}d ago`, color: 'bg-red-100 text-red-800' };
    if (days <= 30) return { label: `Expires in ${days}d`, color: 'bg-amber-100 text-amber-800' };
    return { label: 'Valid', color: 'bg-green-100 text-green-800' };
};

export default function DriverDocumentsTab({ token }: { token: string }) {
    const [documents, setDocuments] = useState<DriverDocument[]>([]);
    const [loading, setLoading] = useState(true);

    const [docType, setDocType] = useState<DocType>('license');
    const [documentNumber, setDocumentNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/driver-portal/${token}/documents/`);
            const data = await res.json();
            setDocuments(data.documents || []);
        } catch (err) {
            console.error('Error loading documents:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleAdd = async () => {
        setError('');
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('doc_type', docType);
            if (documentNumber) formData.append('document_number', documentNumber);
            if (expiryDate) formData.append('expiry_date', expiryDate);
            if (file) formData.append('file', file);

            const res = await fetch(`/api/driver-portal/${token}/documents/`, { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to save document');

            setDocumentNumber('');
            setExpiryDate('');
            setFile(null);
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save document');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Add Document</p>
                <div className="space-y-3">
                    <select
                        value={docType}
                        onChange={e => setDocType(e.target.value as DocType)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {Object.entries(DOC_TYPE_META).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <input
                        value={documentNumber}
                        onChange={e => setDocumentNumber(e.target.value)}
                        placeholder="Document # (optional)"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-gray-600 border-2 border-dashed border-gray-300 rounded-xl py-4 cursor-pointer hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        {file ? file.name : 'Upload document photo'}
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={e => setFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                    </label>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        onClick={handleAdd}
                        disabled={saving}
                        className="w-full bg-black text-white font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Add Document
                    </button>
                </div>
            </div>

            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">My Documents</p>
                {loading ? (
                    <div className="text-center py-8"><Loader2 className="w-5 h-5 animate-spin text-gray-400 mx-auto" /></div>
                ) : documents.length === 0 ? (
                    <div className="text-center py-8 text-sm text-gray-400">No documents on file yet</div>
                ) : (
                    <div className="space-y-2">
                        {documents.map(doc => {
                            const status = getExpiryStatus(doc.expiry_date);
                            return (
                                <div key={doc.id} className="bg-white rounded-xl border border-gray-100 p-3">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-sm font-bold text-gray-900">{DOC_TYPE_META[doc.doc_type]}</span>
                                        {status && <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.color}`}>{status.label}</span>}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {doc.document_number && <span>#{doc.document_number} · </span>}
                                        {doc.expiry_date ? `Expires ${new Date(doc.expiry_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'No expiry set'}
                                    </p>
                                    {doc.file_url && (
                                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1">
                                            <FileText className="w-3 h-3" /> View file
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
