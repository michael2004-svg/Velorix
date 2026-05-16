-- Seed jobs
insert into jobs (slug, title, category, category_color, pay_range, pay_min, pay_max, tags, description, skills, level, course_name)
values
  ('mathematics-ai-trainer', 'Mathematics AI Trainer', 'Mathematics', 'violet', '$25–$45/hr', 25, 45, array['Calculus','Linear Algebra','Statistics'], 'Evaluate and improve AI-generated math solutions across advanced topics.', array['Advanced Mathematics','Critical Thinking'], 'Advanced', 'Advanced AI Math Evaluation Program'),
  ('coding-expert-ai-trainer', 'Coding Expert AI Trainer', 'Software Engineering', 'cyan', '$30–$60/hr', 30, 60, array['Python','JavaScript','Algorithms'], 'Review and rate AI-generated code, write complex coding challenges.', array['Programming','Algorithms'], 'Senior', 'AI Coding Specialist Program'),
  ('cybersecurity-ai-trainer', 'Cybersecurity AI Trainer', 'Cybersecurity', 'green', '$35–$65/hr', 35, 65, array['Penetration Testing','Network Security'], 'Train AI systems on cybersecurity concepts and threat detection.', array['Network Security','Ethical Hacking'], 'Expert', 'Cybersecurity AI Certification'),
  ('medical-ai-data-annotator', 'Medical AI Data Annotator', 'Healthcare', 'pink', '$28–$50/hr', 28, 50, array['Medical Terminology','Clinical Data'], 'Annotate medical datasets and review AI-generated clinical summaries.', array['Medical Knowledge','Data Annotation'], 'Intermediate', 'Healthcare AI Specialist Certification'),
  ('legal-ai-content-reviewer', 'Legal AI Content Reviewer', 'Legal', 'orange', '$30–$55/hr', 30, 55, array['Legal Research','Contract Analysis'], 'Review AI-generated legal documents for accuracy and compliance.', array['Legal Research','Contract Law'], 'Advanced', 'Legal AI Specialist Program'),
  ('ai-response-quality-reviewer', 'AI Response Quality Reviewer', 'Quality Assurance', 'violet', '$18–$38/hr', 18, 38, array['RLHF','Evaluation','Ranking'], 'Evaluate AI-generated responses for quality and factuality.', array['Critical Thinking','AI Literacy'], 'Intermediate', 'AI Quality Evaluation Specialist');

-- Seed courses
insert into courses (slug, title, price, description, duration, level, modules_count, related_job_category)
values
  ('advanced-ai-math-evaluation', 'Advanced AI Math Evaluation Program', 129, 'Master mathematical AI evaluation including calculus and statistics.', '8 weeks', 'Advanced', 12, 'Mathematics'),
  ('ai-coding-specialist-program', 'AI Coding Specialist Program', 149, 'Evaluate AI-generated code across Python and JavaScript.', '10 weeks', 'Senior', 15, 'Software Engineering'),
  ('cybersecurity-ai-certification', 'Cybersecurity AI Certification', 199, 'Comprehensive cybersecurity AI training covering threat detection.', '12 weeks', 'Expert', 18, 'Cybersecurity'),
  ('healthcare-ai-specialist', 'Healthcare AI Specialist Certification', 179, 'Medical AI annotation and clinical data evaluation.', '10 weeks', 'Intermediate', 14, 'Healthcare'),
  ('legal-ai-specialist', 'Legal AI Specialist Program', 169, 'Legal AI content review and compliance evaluation.', '8 weeks', 'Advanced', 12, 'Legal'),
  ('ai-quality-evaluation', 'AI Quality Evaluation Specialist', 119, 'Evaluate and improve AI response quality.', '6 weeks', 'Intermediate', 10, 'Quality Assurance');