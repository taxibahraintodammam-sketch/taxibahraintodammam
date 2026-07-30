'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Save, Trash2 } from 'lucide-react';
import { useEmailTemplates } from '@/hooks/useEmailTemplates';

interface EmailTemplatePickerProps {
    subject: string;
    message: string;
    onLoad: (subject: string, body: string) => void;
}

const SETUP_SQL = `CREATE TABLE IF NOT EXISTS email_templates (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  category   text NOT NULL DEFAULT 'General',
  subject    text NOT NULL,
  body       text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access" ON email_templates FOR ALL USING (auth.role() = 'authenticated');`;

export default function EmailTemplatePicker({ subject, message, onLoad }: EmailTemplatePickerProps) {
    const { templates, dbReady, saveTemplate, deleteTemplate } = useEmailTemplates();
    const [open, setOpen] = useState(false);
    const [showSaveForm, setShowSaveForm] = useState(false);
    const [showSql, setShowSql] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('General');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!newTitle.trim() || !subject.trim() || !message.trim()) return;
        setSaving(true);
        await saveTemplate(newTitle.trim(), newCategory.trim(), subject, message);
        setSaving(false);
        setShowSaveForm(false);
        setNewTitle('');
    };

    return (
        <div className="relative">
            <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setOpen(!open)} className="bg-white gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Templates{templates.length > 0 ? ` (${templates.length})` : ''}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSaveForm(!showSaveForm)}
                    disabled={!subject.trim() || !message.trim()}
                    className="bg-white gap-1.5"
                >
                    <Save className="w-3.5 h-3.5" /> Save as Template
                </Button>
            </div>

            {showSaveForm && (
                <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
                    <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Template name, e.g. Booking Follow-up" className="h-8 text-sm bg-white" />
                    <Input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Category (optional)" className="h-8 text-sm bg-white" />
                    <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={handleSave} disabled={saving || !newTitle.trim()} className="bg-primary text-black hover:bg-black hover:text-white font-bold">
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => setShowSaveForm(false)}>Cancel</Button>
                    </div>
                </div>
            )}

            {open && (
                <div className="absolute z-30 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
                    {!dbReady ? (
                        <div className="p-4 text-xs text-amber-800">
                            <p className="font-bold mb-1">Templates table not set up yet.</p>
                            <button onClick={() => setShowSql(!showSql)} className="text-amber-700 underline">
                                {showSql ? 'Hide SQL' : 'Show SQL to create it'}
                            </button>
                            {showSql && <pre className="mt-2 bg-amber-50 border border-amber-200 rounded p-2 text-[10px] overflow-x-auto font-mono">{SETUP_SQL}</pre>}
                        </div>
                    ) : templates.length === 0 ? (
                        <p className="p-4 text-xs text-gray-400 text-center">No saved templates yet. Write a message and click "Save as Template".</p>
                    ) : (
                        templates.map(t => (
                            <div key={t.id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                                <button
                                    type="button"
                                    onClick={() => { onLoad(t.subject, t.body); setOpen(false); }}
                                    className="text-left flex-1 min-w-0"
                                >
                                    <p className="text-sm font-bold text-gray-900 truncate">{t.title}</p>
                                    <p className="text-[10px] text-gray-400 uppercase">{t.category}</p>
                                </button>
                                <button type="button" onClick={() => deleteTemplate(t.id)} className="text-gray-300 hover:text-red-500 shrink-0 ml-2">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
