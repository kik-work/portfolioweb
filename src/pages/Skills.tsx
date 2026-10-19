import { useState, type CSSProperties } from "react";
import AdditionalSkillPage from "@/components/AdditionalSkill";
import { SKILL_TABS, type SkillItem } from "@/components/interface/skillInterface";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { panelId, tabId } from "@/lib/tabs";

// Shorter labels keep the segmented control on one line on phones.
const shortLabel: Record<string, string> = { frameworks: "Frameworks" };

function SkillTile({ skill, index }: { skill: SkillItem; index: number }) {
  return (
    <li className="animate-rise-in" style={{ "--rise-delay": `${index * 45}ms` } as CSSProperties}>
      <div className="flex h-full items-center gap-4 rounded-2xl bg-card p-4 pr-5 transition-[scale] duration-500 ease-out-expo hover:scale-[1.02]">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-black/5">
          <img src={skill.icon} alt="" width={32} height={32} loading="lazy" className="size-8 object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[1.0625rem] font-semibold tracking-[-0.015em]">{skill.name}</p>
            <span className="shrink-0 text-xs font-medium text-muted-foreground">{skill.level}</span>
          </div>
          <div aria-hidden="true" className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]">
            <div
              className="skill-bar h-full rounded-full bg-[image:var(--spectrum)]"
              style={{ width: `${Math.min(skill.rating, 10) * 10}%`, "--rise-delay": `${index * 45}ms` } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState(SKILL_TABS[0].id);

  return (
    <div className="shell py-24 md:py-32">
      <SectionHeader
        id="section-skills-title"
        title="Skills."
        subtitle="The tools I build with."
      >
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Technologies, tools, and professional skills I use to build modern applications.
        </p>
      </SectionHeader>

      <Reveal className="mt-12" delay={80}>
        <SegmentedControl
          idPrefix="skills"
          label="Skill categories"
          value={activeTab}
          onChange={setActiveTab}
          segments={SKILL_TABS.map((t) => ({
            id: t.id,
            label: (
              <>
                <t.icon aria-hidden="true" />
                {shortLabel[t.id] ?? t.label}
              </>
            ),
          }))}
        />
      </Reveal>

      {/* Every panel stays in the DOM (hidden) so all skills are indexable. */}
      <Reveal className="mt-8" delay={140}>
        {SKILL_TABS.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={panelId("skills", tab.id)}
            aria-labelledby={tabId("skills", tab.id)}
            hidden={tab.id !== activeTab}
            tabIndex={0}
            className="rounded-3xl outline-offset-4"
          >
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {tab.skills.map((skill, i) => (
                <SkillTile key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <AdditionalSkillPage />
    </div>
  );
}
