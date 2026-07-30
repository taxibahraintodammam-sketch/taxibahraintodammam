'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface EmailTemplate {
    id: string;
    title: string;
    category: string;
    subject: string;
    body: string;
}

// Backed by the optional `email_templates` table (see the SETUP_SQL shown in
// components/admin/EmailTemplatePicker.tsx). dbReady is false until that
// table has been created, so the picker can show the setup SQL instead of
// silently failing.
export function useEmailTemplates() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [dbReady, setDbReady] = useState(false);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        const { data, error } = await supabase
            .from('email_templates')
            .select('id, title, category, subject, body')
            .order('created_at', { ascending: false });

        if (error) {
            setDbReady(false);
            setTemplates([]);
        } else {
            setDbReady(true);
            setTemplates(data ?? []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const saveTemplate = useCallback(
        async (title: string, category: string, subject: string, body: string) => {
            const { error } = await supabase
                .from('email_templates')
                .insert([{ title, category: category || 'General', subject, body }]);
            if (!error) await refresh();
            return { error };
        },
        [refresh]
    );

    const deleteTemplate = useCallback(
        async (id: string) => {
            const { error } = await supabase.from('email_templates').delete().eq('id', id);
            if (!error) await refresh();
            return { error };
        },
        [refresh]
    );

    return { templates, dbReady, loading, saveTemplate, deleteTemplate, refresh };
}
