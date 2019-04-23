import About from './about/about';
import Skills from './skills/skills';

const about = document.getElementById('about'),
skills = document.getElementById('skills');

if(about){
    (new About(about)).moveBackground();
}
if(skills){
    (new Skills(skills))
}s