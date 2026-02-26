import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchActivities } from "../features/activity/activitySlice";

export default function ActivityPage() {
  const dispatch = useAppDispatch();
  const { logs, loading } = useAppSelector((state: { activity: any; }) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities(1));
  }, []);

  return (
    <div className="activityPage">
      <h2>Activity Logs</h2>

      {loading && <p>Loading...</p>}

      {logs.map((log: any) => (
        <div key={log._id} className="activityCard">
          <p>
            <strong>{log.task?.title}</strong>
          </p>
          <p>{log.message}</p>
          <small>{new Date(log.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
