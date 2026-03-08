import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useMetrics, useTestimonials } from "@/hooks/use-portfolio-data";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, Save, Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const ACCESS_KEY = "zilman2026";

/* ─── Access Gate ─── */
const AccessGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (key === ACCESS_KEY) {
      sessionStorage.setItem("manage_unlocked", "true");
      onUnlock();
    } else setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass-card p-10 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock size={28} strokeWidth={1.5} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Content Manager</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter the access key to continue.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Access key"
          className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-3"
        />
        {error && <p className="text-sm text-destructive mb-3">Invalid access key.</p>}
        <button onClick={submit} className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
          Unlock
        </button>
      </div>
    </div>
  );
};

/* ─── Styled Field ─── */
const Field = ({ label, value, onChange, textarea, type = "text" }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
    {textarea ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none text-sm" />
    ) : (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm" />
    )}
  </div>
);

const SaveBtn = ({ onClick, label = "Save" }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
    <Save size={16} strokeWidth={1.5} /> {label}
  </button>
);

/* ─── Profile Tab ─── */
const ProfileTab = () => {
  const { data: profile } = useProfile();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    full_name: "", job_title: "", hero_headline: "", sub_headline: "",
    cv_url: "", linkedin_url: "", email: "", phone: "", location: "", photo_url: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        job_title: profile.job_title || "",
        hero_headline: profile.hero_headline || "",
        sub_headline: profile.sub_headline || "",
        cv_url: profile.cv_url || "",
        linkedin_url: profile.linkedin_url || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        photo_url: (profile as any).photo_url || "",
      });
    }
  }, [profile]);

  const save = async () => {
    if (!profile) return;
    const { error } = await supabase.from("profile").update(form as any).eq("id", profile.id);
    if (error) { toast.error("Failed to save"); return; }
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Profile updated");
  };

  if (!profile) return <p className="text-muted-foreground">No profile found.</p>;

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
        <Field label="Job Title" value={form.job_title} onChange={(v) => setForm({ ...form, job_title: v })} />
      </div>
      <Field label="Hero Headline" value={form.hero_headline} onChange={(v) => setForm({ ...form, hero_headline: v })} />
      <Field label="Sub Headline" value={form.sub_headline} onChange={(v) => setForm({ ...form, sub_headline: v })} textarea />
      <Field label="Profile Photo URL" value={form.photo_url} onChange={(v) => setForm({ ...form, photo_url: v })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => setForm({ ...form, linkedin_url: v })} />
        <Field label="CV / Resume Link" value={form.cv_url} onChange={(v) => setForm({ ...form, cv_url: v })} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
      </div>
      <SaveBtn onClick={save} label="Save Profile" />
    </div>
  );
};

/* ─── Metrics Tab ─── */
const MetricsTab = () => {
  const { data: metrics } = useMetrics();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", value: "", description: "", category: "", display_order: 0 });

  const startEdit = (m: any) => { setEditing(m.id); setForm({ label: m.label || "", value: m.value || "", description: m.description || "", category: m.category || "", display_order: m.display_order || 0 }); };
  const startNew = () => { setEditing("new"); setForm({ label: "", value: "", description: "", category: "", display_order: (metrics?.length || 0) + 1 }); };

  const save = async () => {
    if (editing === "new") {
      const { error } = await supabase.from("metrics").insert({ ...form });
      if (error) { toast.error("Failed to add"); return; }
      toast.success("Metric added");
    } else {
      const { error } = await supabase.from("metrics").update(form).eq("id", editing!);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Metric updated");
    }
    qc.invalidateQueries({ queryKey: ["metrics"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("metrics").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    qc.invalidateQueries({ queryKey: ["metrics"] });
    toast.success("Metric deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{metrics?.length || 0} Metrics</h3>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-medium rounded-xl text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={1.5} /> Add New
        </button>
      </div>
      {editing && (
        <div className="glass-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{editing === "new" ? "New Metric" : "Edit Metric"}</h4>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} strokeWidth={1.5} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Label" value={form.label} onChange={(v) => setForm({ ...form, label: v })} />
            <Field label="Value" value={form.value} onChange={(v) => setForm({ ...form, value: v })} />
            <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
            <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          </div>
          <SaveBtn onClick={save} />
        </div>
      )}
      <div className="space-y-3">
        {metrics?.map((m) => (
          <div key={m.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">{m.value}</span>
              <span className="text-muted-foreground ml-2">{m.label}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(m)} className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Pencil size={15} strokeWidth={1.5} /></button>
              <button onClick={() => remove(m.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={15} strokeWidth={1.5} /></button>
            </div>
          </div>
        ))}
        {(!metrics || metrics.length === 0) && <p className="text-muted-foreground text-sm">No metrics yet.</p>}
      </div>
    </div>
  );
};

/* ─── Testimonials Tab ─── */
const TestimonialsTab = () => {
  const { data: testimonials } = useTestimonials();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ client_name: "", client_title: "", company: "", quote_text: "", category_tag: "" });

  const startEdit = (t: any) => { setEditing(t.id); setForm({ client_name: t.client_name || "", client_title: t.client_title || "", company: t.company || "", quote_text: t.quote_text || "", category_tag: t.category_tag || "" }); };
  const startNew = () => { setEditing("new"); setForm({ client_name: "", client_title: "", company: "", quote_text: "", category_tag: "" }); };

  const save = async () => {
    if (editing === "new") {
      const { error } = await supabase.from("testimonials").insert(form);
      if (error) { toast.error("Failed to add"); return; }
      toast.success("Testimonial added");
    } else {
      const { error } = await supabase.from("testimonials").update(form).eq("id", editing!);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Testimonial updated");
    }
    qc.invalidateQueries({ queryKey: ["testimonials"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    qc.invalidateQueries({ queryKey: ["testimonials"] });
    toast.success("Testimonial deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{testimonials?.length || 0} Testimonials</h3>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-medium rounded-xl text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} strokeWidth={1.5} /> Add New
        </button>
      </div>
      {editing && (
        <div className="glass-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{editing === "new" ? "New Testimonial" : "Edit Testimonial"}</h4>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} strokeWidth={1.5} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Client Name" value={form.client_name} onChange={(v) => setForm({ ...form, client_name: v })} />
            <Field label="Client Title" value={form.client_title} onChange={(v) => setForm({ ...form, client_title: v })} />
            <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            <Field label="Category Tag" value={form.category_tag} onChange={(v) => setForm({ ...form, category_tag: v })} />
          </div>
          <Field label="Quote" value={form.quote_text} onChange={(v) => setForm({ ...form, quote_text: v })} textarea />
          <SaveBtn onClick={save} />
        </div>
      )}
      <div className="space-y-3">
        {testimonials?.map((t) => (
          <div key={t.id} className="glass-card p-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">{t.client_name} <span className="font-normal text-muted-foreground">{t.client_title}</span></p>
              <p className="text-sm text-muted-foreground mt-1 italic truncate">"{t.quote_text}"</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(t)} className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Pencil size={15} strokeWidth={1.5} /></button>
              <button onClick={() => remove(t.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={15} strokeWidth={1.5} /></button>
            </div>
          </div>
        ))}
        {(!testimonials || testimonials.length === 0) && <p className="text-muted-foreground text-sm">No testimonials yet.</p>}
      </div>
    </div>
  );
};

/* ─── Main ─── */
const tabs = ["Profile", "Metrics", "Testimonials"] as const;

const ManageContent = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("manage_unlocked") === "true");
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Profile");

  if (!unlocked) return <AccessGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-20 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Manager</h1>
            <p className="text-muted-foreground text-sm mt-1">Edit your portfolio data.</p>
          </div>
          <a href="/" className="text-sm text-primary hover:underline">← Back to site</a>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="glass-card p-8">
          {activeTab === "Profile" && <ProfileTab />}
          {activeTab === "Metrics" && <MetricsTab />}
          {activeTab === "Testimonials" && <TestimonialsTab />}
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
