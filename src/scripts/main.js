/**
 * Main JavaScript bundle file. Magic happens here!
 * 
 * Created with plumming love to code.
 * 
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@kacperpruszynski.pl>
 */

import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import About from './about/about';
import Skills from './skills/skills';

class Main{
    constructor(){
        this.aboutNode = document.getElementById('about');
        this.about = this.getAbout();
        this.skillsNode = document.getElementById('skills');
        this.skills = this.getSkills();
    }

    nodeExist(node){
        return Boolean(node)
    }

    getSkills(){
        if(this.nodeExist(this.skillsNode)){
            this.skills = new Skills(this.skillsNode);
        }

        return this.skills;
    }

    getAbout(){
        if(this.nodeExist(this.aboutNode)){
            this.about = new About(this.aboutNode);
        }

        return this.about;
    }

    init(){
        if(this.nodeExist(this.aboutNode)){
            this.about.moveBackground();
        }
    }
}

// it's time to plumming
(new Main()).init();