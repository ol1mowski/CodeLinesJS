import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsOverview } from "../StatsOverview.component";
import { useStats } from "../../hooks/useStats.hook";

vi.mock("../../hooks/useStats.hook");

const mockStats = {
  data: {
    level: 5,
    points: 1500,
    pointsToNextLevel: 2000,
    completedLessons: 25,
    streak: 7,
    bestStreak: 14,
    badges: [
      {
        id: "1",
        name: "First Challenge",
        icon: "🏆",
        earnedAt: "2024-03-20T12:00:00Z",
        description: "Test badge",
      },
    ],
    unlockedFeatures: [],
    chartData: { daily: [], categories: [] },
  },
};

describe("StatsOverview", () => {
  beforeEach(() => {
    (useStats as Mock).mockReset();
  });

  it("renders loading state", () => {
    (useStats as Mock).mockReturnValue({ isLoading: true });
    render(<StatsOverview stats={mockStats} isLoading={true} error={null} />);

    const loadingElement = screen.getByRole("status", {
      name: /ładowanie strony/i,
    });
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useStats as Mock).mockReturnValue({
      error: new Error("Test error"),
      isLoading: false,
    });
    render(
      <StatsOverview
        stats={mockStats}
        isLoading={false}
        error={new Error("Test error")}
      />
    );
    expect(screen.getByText(/Wystąpił błąd/)).toBeInTheDocument();
  });

  it("renders stats correctly", () => {
    (useStats as Mock).mockReturnValue({
      data: mockStats,
      isLoading: false,
    });
    render(
      <StatsOverview
        stats={mockStats}
        isLoading={false}
        error={new Error("Test error")}
      />
    );

    expect(screen.getByText("Poziom 5")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("7 dni")).toBeInTheDocument();
  });
});
