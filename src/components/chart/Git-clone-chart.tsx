"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { GitBranch, GitCommitHorizontal } from "lucide-react"

type Day = {
    date: string
    commits: number
}

const chartColors = [
    "var(--secondary)",
    "var(--chart-2-github)",
    "var(--chart-3-github)",
    "var(--chart-4-github)",
    "var(--chart-5-github)",
]

function getColor(count: number) {
    if (count === 0) return chartColors[0]
    if (count < 2) return chartColors[1]
    if (count < 5) return chartColors[2]
    if (count < 10) return chartColors[3]
    return chartColors[4]
}

const CACHE_KEY = "gh_contributions"
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

function getCached(): Day[] | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const { data, ts } = JSON.parse(raw)
        if (Date.now() - ts > CACHE_TTL) return null
        return data
    } catch {
        return null
    }
}

function setCache(data: Day[]) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
    } catch {
        // storage quota exceeded — silently skip
    }
}

export function GitHubContributionChart() {
    const [data, setData] = React.useState<Day[]>(() => getCached() ?? [])
    const [loading, setLoading] = React.useState(() => getCached() === null)

    React.useEffect(() => {
        if (!loading) return // already have cached data

        fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                query: `
        {
          user(login: "${import.meta.env.VITE_GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
        `,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                const days = json.data.user.contributionsCollection.contributionCalendar.weeks
                    .flatMap((week: any) =>
                        week.contributionDays.map((day: any) => ({
                            date: day.date,
                            commits: day.contributionCount,
                        }))
                    )
                setCache(days)
                setData(days)
                setLoading(false)
            })
            .catch(() => setLoading(false))

    }, [])
    const totalCommits = React.useMemo(
        () => data.reduce((acc, curr) => acc + curr.commits, 0),
        [data]
    )

    if (loading) {
        return (
            <Card className="py-7">
                <CardContent className="text-sm text-muted-foreground">
                    Loading GitHub contributions…
                </CardContent>
            </Card>
        )
    }

    if (!data.length) return null

    // Get the day of week for first date
    const firstDate = new Date(data[0].date)
    const firstDay = firstDate.getDay()

    // Pad the first week
    const paddedStart = Array(firstDay).fill({ date: "", commits: 0 })
    const paddedData = [...paddedStart, ...data]

    // Pad the last week to have 7 days
    const remainder = paddedData.length % 7
    const paddedEnd = remainder === 0 ? [] : Array(7 - remainder).fill({ date: "", commits: 0 })
    const finalData = [...paddedData, ...paddedEnd]

    // Split into weeks
    const weeks: Day[][] = []
    for (let i = 0; i < finalData.length; i += 7) {
        weeks.push(finalData.slice(i, i + 7))
    }

    // Month labels (first day of each week, including year)
    const monthLabels: { index: number; label: string }[] = []
    weeks.forEach((week, i) => {
        const firstValidDay = week.find((d) => d.date)
        if (!firstValidDay) return
        const date = new Date(firstValidDay.date)
        const label = date.toLocaleString("default", { month: "short" })
        if (!monthLabels.find((m) => m.label === label)) {
            monthLabels.push({ index: i, label })
        }
    })

    const dayLabels = ["Mon", "Wed", "Fri"]

    return (
        <Card className="gap-4 pt-0 pb-6">
            <CardHeader className="flex flex-col items-stretch border-b border-hairline p-0! sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-7 pt-7 pb-4 sm:pb-6">
                    <CardTitle className="flex items-center gap-1">
                        GitHub Commits Contribution <GitBranch className="h-4 w-4 text-link" aria-hidden="true"/>
                    </CardTitle>
                    <CardDescription>
                        Live data from GitHub GraphQL API
                    </CardDescription>
                    <div className="mb-1">
                        <span className="text-xs text-muted-foreground">github username:</span>
                        <a href="https://github.com/kik-work" target="_blank" rel="noopener noreferrer" className="ml-1.5 inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-link hover:bg-foreground/[0.05]">kik-work</a>
                    </div>

                </div>

                <div className="flex">
                    <div className="flex flex-1 flex-col justify-center gap-1 border-t border-hairline px-7 py-5 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                            Total Commits <GitCommitHorizontal className="h-4 w-4 text-link" aria-hidden="true"/>
                        </span>
                        <span className="leading-none">
                            <span className="text-spectrum text-4xl font-bold tracking-[-0.04em]">{totalCommits.toLocaleString()}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">in the last year</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="overflow-x-auto px-7 pt-2 no-scrollbar">
                {/* Month labels */}
                <div className="flex mb-2 ml-10 text-xs text-muted-foreground min-w-max">
                    {weeks.map((week, i) => {
                        const firstValidDay = week.find((d) => d.date)
                        if (!firstValidDay) return <div key={i} className="w-5" /> // empty week

                        const month = new Date(firstValidDay.date).toLocaleString("default", { month: "short" })
                        const isFirstWeekOfMonth =
                            i === 0 ||
                            new Date(weeks[i - 1].find((d) => d.date)?.date || "").getMonth() !==
                            new Date(firstValidDay.date).getMonth()

                        return (
                            <div key={i} className="w-5 text-center shrink-0">
                                {isFirstWeekOfMonth ? month : ""}
                            </div>
                        )
                    })}
                </div>

                {/* Contribution squares */}
                <div className="flex">
                    {/* Day labels */}
                    <div className="flex flex-col justify-between mr-2 mt-2 text-xs text-muted-foreground h-28 shrink-0">
                        {dayLabels.map((day, i) => (
                            <span key={i}>{day}</span>
                        ))}
                    </div>

                    {/* Weeks container with horizontal scroll on mobile */}
                    <div className="flex space-x-1 min-w-max pb-2">
                        {weeks.map((week, i) => (
                            <div key={i} className="flex flex-col space-y-1 shrink-0">
                                {week.map((day, j) => (
                                    <div
                                        key={i + "-" + j}
                                        className="w-4 h-4 rounded-[4px] transition-transform duration-200 hover:scale-125"
                                        style={{ backgroundColor: getColor(day.commits) }}
                                        title={
                                            day.date
                                                ? `${day.commits} commit${day.commits !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString()}`
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                </div>


            {/* Legend */}
            <div className="flex items-center justify-end gap-1 mt-4 text-xs">
                <span className="text-muted-foreground">Less</span>
                <div className="flex gap-0.5">
                    {chartColors.map((color, i) => (
                        <div
                            key={i}
                            className="w-4 h-4 rounded-[4px]"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <span className="text-muted-foreground">More</span>
            </div>
            </CardContent>
        </Card>

    )
}
