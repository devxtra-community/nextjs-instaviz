import axiosInstance from "./axiosInstance";

export interface SessionSummary {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data_id?: any;
}

export interface SessionFull {
  _id: string;
  title: string;
  user_id?: string | null;
  session_token?: string | null;
  messages: { fromAi?: string | null; fromUser?: string | null; createdAt?: string }[];
  charts: any[];
  metrics: any;
  data_id?: any;
}

export async function listSessions() {
  const res = await axiosInstance.get<{ sessions: SessionSummary[]; session_token?: string }>(
    "/session"
  );
  return res.data;
}

export async function createSession(payload: {
  title?: string;
  data_id?: string | null;
  charts?: any[];
  messages?: any[];
  metrics?: any;
}) {
  const res = await axiosInstance.post<{ session: SessionFull; session_token?: string }>(
    "/session",
    payload
  );
  return res.data;
}

export async function getSession(id: string) {
  const res = await axiosInstance.get<SessionFull>(`/session/${id}`);
  return res.data;
}

export async function appendMessage(sessionId: string, fromUser?: string, fromAi?: string) {
  const res = await axiosInstance.post(`/session/${sessionId}/message`, { fromUser, fromAi });
  return res.data;
}

export async function appendChart(sessionId: string, chart: any) {
  const res = await axiosInstance.post(`/session/${sessionId}/chart`, { chart });
  return res.data;
}

export async function updateSession(sessionId: string, update: Partial<any>) {
  const res = await axiosInstance.patch(`/session/${sessionId}`, update);
  return res.data;
}
