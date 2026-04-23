import json
import re
from typing import Dict, List, Any, Optional

class BrainEngine:
    def __init__(self, profile_file: str = "profile.json"):
        try:
            with open(profile_file, 'r') as f:
                self.data = json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Profile file '{profile_file}' not found. Please create it with your details.")
        except json.JSONDecodeError:
            raise ValueError(f"Invalid JSON in '{profile_file}'. Please check the file format.")

    def get_personal_details(self) -> Dict[str, Any]:
        """Get personal details"""
        return self.data["personal_details"]

    def get_academic_details(self) -> Dict[str, Any]:
        """Get academic details"""
        return self.data["academic"]

    def get_internships(self) -> List[Dict[str, Any]]:
        """Get internships"""
        return self.data["internships"]

    def get_work_experience(self) -> List[Dict[str, Any]]:
        """Get work experience"""
        return self.data["work_experience"]

    def get_college_projects(self) -> List[Dict[str, Any]]:
        """Get college projects"""
        return self.data["college_projects"]

    def get_skills(self) -> Dict[str, List[str]]:
        """Get skills"""
        return self.data["skills"]

    def get_publications(self) -> List[Dict[str, Any]]:
        """Get publications"""
        return self.data["publications"]

    def get_patents(self) -> List[Dict[str, Any]]:
        """Get patents"""
        return self.data["patents"]

    def search_skills(self, query: str) -> List[str]:
        """Search for skills matching the query"""
        all_skills = []
        for category, skills in self.data["skills"].items():
            all_skills.extend(skills)
        return [skill for skill in all_skills if query.lower() in skill.lower()]

    def search_experience(self, query: str) -> List[Dict[str, Any]]:
        """Search work experience and internships for matching keywords"""
        results = []
        for exp in self.data["work_experience"] + self.data["internships"]:
            if any(query.lower() in str(value).lower() for value in exp.values()):
                results.append(exp)
        return results

    def generate_resume_summary(self) -> str:
        """Generate a brief resume summary"""
        personal = self.data["personal_details"]
        academic = self.data["academic"]
        skills = self.data["skills"]
        summary = f"""
{personal['name']} is an {personal['role']} with {personal['experience_years']} year(s) of experience.
Currently working at {self.data['work_experience'][0]['company']} as {self.data['work_experience'][0]['role']}.
Graduated with {academic['degree']} from {academic['college']} with CGPA {academic['cgpa']}.
Core skills include: {', '.join(skills['core'])}.
Proficient in: {', '.join(skills['languages'] + skills['frameworks'])}.
        """.strip()
        return summary

    def answer_query(self, query: str) -> str:
        """Simple query answering based on keywords"""
        query_lower = query.lower()

        if "name" in query_lower or "who" in query_lower:
            return f"My name is {self.data['personal_details']['name']}."

        if "email" in query_lower or "contact" in query_lower:
            return f"My email is {self.data['personal_details']['email']}."

        if "phone" in query_lower:
            return f"My phone number is {self.data['personal_details']['phone']}."

        if "experience" in query_lower or "work" in query_lower:
            exp = self.get_work_experience()
            if exp:
                return f"I have {len(exp)} work experience(s). Currently at {exp[0]['company']} as {exp[0]['role']} since {exp[0]['duration']}."
            else:
                return "I have no work experience listed."

        if "internship" in query_lower:
            interns = self.get_internships()
            return f"I have {len(interns)} internship(s), including at {', '.join([i['company'] for i in interns])}."

        if "skill" in query_lower:
            skills = self.get_skills()
            core_skills = ', '.join(skills['core'])
            return f"My core skills are: {core_skills}."

        if "education" in query_lower or "degree" in query_lower:
            academic = self.get_academic_details()
            return f"I have a {academic['degree']} from {academic['college']} with CGPA {academic['cgpa']}."

        if "project" in query_lower:
            projects = self.get_college_projects()
            return f"I have worked on {len(projects)} college projects, including {', '.join([p['name'] for p in projects])}."

        if "publication" in query_lower:
            pubs = self.get_publications()
            if pubs:
                return f"I have {len(pubs)} publication(s), including '{pubs[0]['title']}'."
            else:
                return "I have no publications listed."

        if "patent" in query_lower:
            pats = self.get_patents()
            if pats:
                return f"I have {len(pats)} patent(s), including '{pats[0]['title']}'."
            else:
                return "I have no patents listed."

        # Default response
        return "I'm sorry, I don't have information on that. Try asking about my experience, skills, or education."

if __name__ == "__main__":
    brain = BrainEngine()
    print("Brain Engine Loaded!")
    print(brain.generate_resume_summary())
    print("\nExample queries:")
    print("Query: What is your name?")
    print("Answer:", brain.answer_query("What is your name?"))
    print("\nQuery: Tell me about your skills")
    print("Answer:", brain.answer_query("Tell me about your skills"))

