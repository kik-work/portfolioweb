
import HomePage from './Homepage'
import ExperiencePage from './Experience'
import ProjectPage from './Projects'

import EducationPage from './Education'
import AboutPage from './About'
import SkillsPage from './Skills'

const Welcome = () => {
    return (<>
        <section className="max-w-7xl mx-auto px-2 rounded-2xl  py-1 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/10">        
            <HomePage />
            <ExperiencePage goToProjects={() => { }} />
            <ProjectPage />
            <SkillsPage />
            <EducationPage />
            <AboutPage />
        </section>
    </>

    )
}

export default Welcome