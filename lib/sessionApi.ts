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
  messages: { user?: string; ai?: string;  createdAt?: string }[];
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

export async function appendMessage(sessionId: string, user?: string, ai?: string) {
  const res = await axiosInstance.post(`/session/${sessionId}/message`, { user, ai });
  console.log(res.data)
  return res.data;
}

export async function appendChart(sessionId: string, chart: any) {
  const res = await axiosInstance.post(`/session/${sessionId}/chart`, { chart });

  if (!res.data) {
    console.warn("Chart not saved: backend returned null");
    return null;
  }
  
  return res.data;
}


export async function updateSession(sessionId: string, update: Partial<any>) {
  const res = await axiosInstance.patch(`/session/${sessionId}`, update);
  return res.data;
}
