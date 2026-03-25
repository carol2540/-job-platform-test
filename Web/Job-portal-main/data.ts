import type { Job } from '@/types/job.types'

export type { Job } from '@/types/job.types'

const JobData: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    image: "/images/c1.png",
    salary: "35k - 40k",
    location: "London, UK",
    jobtype: "Full time",
    company: "TechNova Solutions",
    description:
      "We are looking for a passionate Software Engineer to design, develop, and maintain high-quality software applications. You will collaborate with cross-functional teams to deliver scalable and efficient solutions. The ideal candidate has strong problem-solving skills and a keen eye for code quality.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    createdAt: "2026-03-10T09:00:00Z",
    status: "live",
  },
  {
    id: 2,
    title: "DevOps Engineer",
    image: "/images/c2.png",
    salary: "40k - 50k",
    location: "Remote",
    jobtype: "Full time",
    company: "CloudBridge Systems",
    description:
      "Join our infrastructure team to build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability. You will work closely with developers to streamline deployments and improve automation workflows across our microservices architecture.",
    tags: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
    createdAt: "2026-03-08T14:30:00Z",
    status: "live",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    image: "/images/c3.png",
    salary: "45k - 55k",
    location: "Kolkata, India",
    jobtype: "Full time",
    company: "PixelCraft Studios",
    description:
      "We need a creative Frontend Engineer to build beautiful, responsive user interfaces. You will be responsible for translating UI/UX designs into clean, performant code. Experience with modern frontend frameworks and attention to detail are essential for this role.",
    tags: ["React", "Next.js", "TailwindCSS", "JavaScript", "Figma"],
    createdAt: "2026-03-05T11:15:00Z",
    status: "live",
  },
  {
    id: 4,
    title: "Backend Developer",
    image: "/images/c4.png",
    salary: "40k - 50k",
    location: "New York, USA",
    jobtype: "Contract",
    company: "DataFlow Inc.",
    description:
      "As a Backend Developer, you will design and implement server-side logic, APIs, and database architectures. You will optimize application performance and ensure data integrity. Proficiency in backend frameworks and database management is required.",
    tags: ["Python", "Django", "PostgreSQL", "REST API", "Redis"],
    createdAt: "2026-03-03T16:45:00Z",
    status: "live",
  },
  {
    id: 5,
    title: "Fullstack Developer",
    image: "/images/c5.png",
    salary: "55k - 65k",
    location: "Sydney, Australia",
    jobtype: "Full time",
    company: "GlobalTech Hub",
    description:
      "We are seeking a versatile Fullstack Developer to work across the entire application stack. From building responsive frontends to designing robust backends, you will own features end-to-end. You thrive in fast-paced environments and enjoy solving complex problems.",
    tags: ["React", "Node.js", "MongoDB", "TypeScript", "GraphQL"],
    createdAt: "2026-02-28T08:00:00Z",
    status: "live",
  },
  {
    id: 6,
    title: "Web Designer",
    image: "/images/c6.png",
    salary: "30k - 40k",
    location: "Toronto, Canada",
    jobtype: "Internship",
    company: "CreativeMinds Agency",
    description:
      "Creative Web Designer needed to craft visually stunning and user-friendly website designs. You will collaborate with clients to understand their brand identity and translate it into compelling digital experiences. Proficiency in design tools and a strong portfolio are required.",
    tags: ["UI/UX", "Figma", "Adobe XD", "CSS3", "Responsive Design"],
    createdAt: "2026-02-25T13:20:00Z",
    status: "draft",
  },
  {
    id: 7,
    title: "Data Engineer",
    image: "/images/c2.png",
    salary: "50k - 60k",
    location: "Berlin, Germany",
    jobtype: "Full time",
    company: "DataStream GmbH",
    description:
      "Design and build data pipelines, data warehouses, and ETL processes to support analytics and machine learning initiatives. You will work with large datasets and ensure data quality and reliability across the organization.",
    tags: ["Python", "Apache Spark", "SQL", "Airflow", "Snowflake"],
    createdAt: "2026-02-20T10:30:00Z",
    status: "live",
  },
  {
    id: 8,
    title: "Mobile Developer",
    image: "/images/c3.png",
    salary: "45k - 55k",
    location: "Singapore",
    jobtype: "Contract",
    company: "AppVenture Asia",
    description:
      "Build cross-platform mobile applications that deliver exceptional user experiences. You will be involved in the entire mobile development lifecycle, from concept to deployment. Strong proficiency in React Native or Flutter is required.",
    tags: ["React Native", "Flutter", "TypeScript", "Firebase", "REST API"],
    createdAt: "2026-02-18T09:45:00Z",
    status: "closed",
  },
];

export default JobData;