
import React, { useMemo, useState } from "react";
import { Phone, CalendarDays, ShieldCheck, Star, CheckCircle2, Droplets, Wrench, Ruler, MapPin, ArrowRight, ChevronDown, Camera, BadgeCheck } from "lucide-react";

/**
 * Humitek – Homepage (single-file React component)
 * TailwindCSS + Next.js (pages router)
 */
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="mb-8 text-center">
    {kicker && <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">{kicker}</div>}
    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    {children && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{children}</p>}
  </div>
);

const Pill = ({ icon: Icon, children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ${className}`}>
    {Icon && <Icon className="h-4 w-4" aria-hidden />}
    <span>{children}</span>
  </div>
);

// Before/After slider
const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  const beforeBg = "bg-[linear-gradient(135deg,#e2e8f0,#cbd5e1)]";
  const afterBg = "bg-[linear-gradient(135deg,#bfdbfe,#93c5fd)]";
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <div className={`relative h-72 ${afterBg}`}>
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          <BadgeCheck className="h-4 w-4"/>
          Après
        </div>
        <div
          className={`absolute inset-0 ${beforeBg}`}
          style={{ width: `${pos}%`, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-label="Avant"
        >
          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <Camera className="h-4 w-4"/>
            Avant
          </div>
        </div>
      </div>
      <input
        aria-label="Comparateur avant/après"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize bg-transparent [accent-color:theme(colors.sky.600)]"
      />
    </div>
  );
};

// FAQ
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-900">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-3 text-slate-600">{a}</p>}
    </div>
  );
};

// Contact form (mock submit)
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate(form) {
    const e = {};
    if (!form.get("name")?.toString().trim()) e.name = "Nom requis";
    const phone = form.get("phone")?.toString().trim();
    if (!phone) e.phone = "Téléphone requis";
    const email = form.get("email")?.toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide";
    const zip = form.get("zip")?.toString().trim();
    if (zip && !/^\d{4,5}$/.test(zip)) e.zip = "Code postal invalide";
    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const eMap = validate(formData);
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    alert("Merci ! Votre demande a été enregistrée. Nous vous rappelons rapidement.");
    e.currentTarget.reset();
  }

  const fieldCls = "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom*</label>
        <input name="name" className={fieldCls} placeholder="Jean Dupont" />
        {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Téléphone*</label>
        <input name="phone" className={fieldCls} placeholder="06 12 34 56 78" />
        {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input name="email" className={fieldCls} placeholder="vous@exemple.fr" />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Code postal</label>
        <input name="zip" className={fieldCls} placeholder="33000" />
        {errors.zip && <p className="mt-1 text-sm text-rose-600">{errors.zip}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Type de problème</label>
        <select name="problem" className={fieldCls} defaultValue="">
          <option value="" disabled>Choisir…</option>
          <option>Remontées capillaires</option>
          <option>Fuite invisible</option>
          <option>Salpêtre / moisissures</option>
          <option>Condensation</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Disponibilité souhaitée</label>
        <input name="slot" className={fieldCls} placeholder="Ex. Mercredi matin" />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea name="message" rows={4} className={fieldCls} placeholder="Décrivez rapidement votre situation…" />
      </div>
      <div className="sm:col-span-2 flex items-start gap-2">
        <input id="gdpr" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
        <label htmlFor="gdpr" className="text-sm text-slate-600">J’accepte d’être recontacté·e et la politique de confidentialité.</label>
      </div>
      <div className="sm:col-span-2">
        <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">
          <Phone className="h-5 w-5" />
          {loading ? "Envoi…" : "Demander un devis"}
        </button>
      </div>
    </form>
  );
};

export default function HumitekHome() {
  const trustBullets = useMemo(() => [
    { icon: ShieldCheck, label: "Partenaire Murprotec – procédés éprouvés" },
    { icon: Star, label: "Avis clients ★★★★★" },
    { icon: CheckCircle2, label: "Suivi & contrôle d’humidité post-chantier" },
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
              <Droplets className="h-6 w-6" aria-hidden />
            </div>
            <div className="leading-tight">
              <div className="font-bold">Humitek</div>
              <div className="text-xs text-slate-500">Humidité & fuites</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="hover:text-sky-700">Services</a>
            <a href="#realisations" className="hover:text-sky-700">Réalisations</a>
            <a href="#avis" className="hover:text-sky-700">Avis</a>
            <a href="#contact" className="hover:text-sky-700">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+33600000000" className="hidden rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 sm:inline-flex items-center gap-2">
              <Phone className="h-4 w-4"/> Appeler
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
              Devis <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </Container>
      </header>

      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <Container className="grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2">
          <div>
            <Pill icon={ShieldCheck}>Diagnostics précis, solutions durables</Pill>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Humitek – Traitement de l’humidité & recherche de fuites
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Interventions soignées, devis transparents, garanties claires. Protection du chantier et traçabilité photo systématiques.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-700">
                Demander un devis <ArrowRight className="h-5 w-5"/>
              </a>
              <a href="#process" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
                Notre méthode
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {trustBullets.map((b, i) => (
                <Pill key={i} icon={b.icon}>{b.label}</Pill>
              ))}
            </div>
          </div>
          <div className="">
            <BeforeAfter />
            <div className="mt-3 text-center text-sm text-slate-500">Exemple d’amélioration après traitement</div>
          </div>
        </Container>
      </section>

      <section id="services" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Services" title="Solutions contre l’humidité, de A à Z">
            Du diagnostic par caméra thermique à l’assèchement, nous traitons durablement la cause.
          </SectionTitle>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Ruler className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Remontées capillaires</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Diagnostic hygrométrique, traitement ciblé, suivi des taux d’humidité jusqu’au retour à l’équilibre.
              </p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline">En savoir plus <ArrowRight className="h-4 w-4"/></a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Wrench className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Recherche de fuites</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Inspection thermographique, hygrométrie, inspection par caméra, traceurs, etc.
              </p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline">En savoir plus <ArrowRight className="h-4 w-4"/></a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <CalendarDays className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Expertise Conseil Avant Vente</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Diagnostic complet avant vente, pathologies du batiment.
              </p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline">En savoir plus <ArrowRight className="h-4 w-4"/></a>
            </div>
          </div>
        </Container>
      </section>

      <section id="process" className="border-b border-slate-200 bg-slate-50 py-12">
        <Container>
          <SectionTitle kicker="Process" title="Un parcours simple, de la prise de contact au contrôle">
            Transparence, protection du chantier et traçabilité photo avant / après.
          </SectionTitle>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Diagnostic", desc: "Inspection, mesures hygrométriques, caméra thermique." },
              { title: "Solution", desc: "Devis clair, planning d’intervention adapté." },
              { title: "Intervention", desc: "Protection du chantier, réalisation soignée." },
              { title: "Contrôle", desc: "Vérifs finales et suivi d’humidité." },
            ].map((step, i) => (
              <li key={i} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white shadow-sm">{i+1}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="realisations" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Réalisations" title="Avant / Après">
            Quelques exemples parlants de résultats après intervention.
          </SectionTitle>
          <BeforeAfter />
        </Container>
      </section>

      <section id="avis" className="border-b border-slate-200 bg-slate-50 py-12">
        <Container>
          <SectionTitle kicker="Confiance" title="Avis & Garanties">
            Preuves sociales, partenariats et assurances pour vous rassurer.
          </SectionTitle>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500" aria-label="Note 5/5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-3 text-sm text-slate-700">“Intervention rapide et propre, plus aucune trace d’humidité. Je recommande !”</p>
              <div className="mt-3 text-sm font-semibold text-slate-900">— M. Laurent, Bordeaux</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sky-700">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-semibold">Assurance & garanties</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">Couvertures professionnelles, garanties d’efficacité selon prestation, documents fournis au devis.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sky-700">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Zone d’intervention</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">Bordeaux & Gironde (déplacements possibles sur demande).</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="bg-white py-12">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Contact & Devis</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Expliquez-nous votre situation, nous revenons vers vous rapidement.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
                  <Phone className="h-6 w-6"/>
                </div>
                <div>
                  <div className="font-semibold">Besoin d’un diagnostic ?</div>
                  <div className="text-sm text-slate-600">Appelez-nous ou laissez vos coordonnées.</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li><strong>Tél.</strong> : <a className="text-sky-700 hover:underline" href="tel:+33600000000">06 00 00 00 00</a></li>
                <li><strong>Email</strong> : <a className="text-sky-700 hover:underline" href="mailto:contact@humitek.fr">contact@humitek.fr</a></li>
                <li><strong>Horaires</strong> : Lun–Ven 8h30–18h30</li>
              </ul>
              <div className="mt-6 space-y-2">
                <Pill icon={ShieldCheck}>Partenaire Murprotec</Pill>
                <Pill icon={BadgeCheck}>Devis transparent</Pill>
                <Pill icon={Camera}>Traçabilité photo</Pill>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <Container>
          <SectionTitle kicker="FAQ" title="Questions fréquentes" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FaqItem
              q="Combien de temps pour assécher un mur ?"
              a="Selon le support et les taux initiaux, comptez de 2 à 12 semaines. Un suivi d’humidité est réalisé jusqu’à stabilisation."
            />
            <FaqItem
              q="Proposez-vous des garanties ?"
              a="Oui, des garanties d’efficacité selon prestation, avec assurance pro. Les détails figurent dans le devis."
            />
            <FaqItem
              q="Intervenez-vous en copropriété ?"
              a="Oui, nous travaillons avec syndics et architectes, rapport photo et devis détaillé à l’appui."
            />
            <FaqItem
              q="Pouvez-vous trouver une fuite sans casser ?"
              a="La plupart du temps, oui. Nous utilisons caméra thermique et tests ciblés pour localiser de manière non destructive."
            />
          </div>
        </Container>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10 text-sm">
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold">Humitek</div>
            <p className="mt-2 text-slate-600">Traitement de l’humidité & recherche de fuites – Bordeaux & Gironde.</p>
          </div>
          <div>
            <div className="font-semibold">Liens</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#realisations" className="hover:underline">Réalisations</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Légal</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">Mentions légales</a></li>
              <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </Container>
        <Container className="mt-8 border-t border-slate-200 pt-6 text-slate-500">
          © {new Date().getFullYear()} Humitek – Tous droits réservés.
        </Container>
      </footer>
    </div>
  );
}
