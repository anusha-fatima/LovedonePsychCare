export type Role = "user" | "therapist" | "admin";

export type TherapistStatus = "pending" | "approved" | "suspended";

export type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: number;
  avatarHue: number;
  therapist?: {
    status: TherapistStatus;
    title: string;
    bio: string;
    specialties: string[];
    yearsOfExperience: number;
    credentials: string;
    languages: string[];
    suspendedReason?: string;
  };
};

export type ChatAuthor = "user" | "bot" | "therapist" | "admin" | "system";

export type Message = {
  id: string;
  conversationId: string;
  authorId: string;
  authorRole: ChatAuthor;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  userId: string;
  therapistId?: string;
  requestedTherapistAt?: number;
  status: "active" | "terminated";
  botEnabled: boolean;
  createdAt: number;
  lastActivity: number;
  title: string;
};
