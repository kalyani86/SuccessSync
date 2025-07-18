import { pgTable, uuid, text, timestamp, integer, jsonb, float, primaryKey } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  clearkUserId: text("cleark_user_id").unique().notNull(),
  email: text("email").unique().notNull(),
  name: text("name"),
  imageUrl: text("image_url"),
  industry: text("industry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  bio: text("bio"),
  experience: integer("experience"),
  skills: jsonb("skills").notNull(),
});

export const IndustryInsight = pgTable("industry_insight", {
  id: uuid("id").primaryKey().defaultRandom(),
  industry: text("industry").unique().notNull(),
  SalaryRanges: jsonb("salary_ranges").notNull(),
  growthRate: float("growth_rate").notNull(),
  demandLevel: text("demand_level").notNull(),
  topSkills: jsonb("top_skills").notNull(),
  marketOutlook: text("market_outlook").notNull(),
  keyTrends: jsonb("key_trends").notNull(),
  recommendedSkills: jsonb("recommended_skills").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  nextUpdate: timestamp("next_update").notNull(),
});

export const Assessment = pgTable("assessment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").unique().notNull(),
  quizScore: float("quiz_score").notNull(),
  question: jsonb("question").notNull(),
  category: text("category").notNull(),
  improvementTip: text("improvement_tip"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Resume = pgTable("resume", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").unique().notNull(),
  content: text("content").notNull(),
  atsScore: float("ats_score"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const CoverLetter = pgTable("cover_letter", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").unique().notNull(),
  content: text("content").notNull(),
  jobDescription: text("job_description"),
  companyName: text("company_name").notNull(),
  jobTitle: text("job_title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
