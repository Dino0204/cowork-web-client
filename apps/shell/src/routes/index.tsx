import { createFileRoute } from "@tanstack/react-router";
import { Component, lazy, Suspense } from "react";
import type { ReactNode } from "react";

const ProfileApp = lazy(() => import("cowork_profile/App"));
const IssueApp = lazy(() => import("cowork_issue/App"));
const ChatApp = lazy(() => import("cowork_chat/App"));

class RemoteErrorBoundary extends Component<
  { name: string; children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="text-sm text-gray-400 p-2">
          {this.props.name} unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <section className="border rounded p-2">
        <RemoteErrorBoundary name="Profile">
          <Suspense fallback={<div>Loading Profile...</div>}>
            <ProfileApp />
          </Suspense>
        </RemoteErrorBoundary>
      </section>
      <section className="border rounded p-2">
        <RemoteErrorBoundary name="Issue">
          <Suspense fallback={<div>Loading Issue...</div>}>
            <IssueApp />
          </Suspense>
        </RemoteErrorBoundary>
      </section>
      <section className="border rounded p-2">
        <RemoteErrorBoundary name="Chat">
          <Suspense fallback={<div>Loading Chat...</div>}>
            <ChatApp />
          </Suspense>
        </RemoteErrorBoundary>
      </section>
    </div>
  );
}
