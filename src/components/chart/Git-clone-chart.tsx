"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Badge } from "../ui/badge"
import { TypographyH1 } from "../ui/typography"
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

export function GitHubContributionChart() {
    const [data, setData] = React.useState<Day[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
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
            <Card className="py-6">
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
        <>    <Card>
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle className="flex items-center gap-1">
                        GitHub Commits Contribution. <GitBranch className="h-4 w-4 text-primary"/>
                    </CardTitle>
                    <CardDescription>
                        Live data from GitHub GraphQL API
                    </CardDescription>
                    <div className="mb-1">
                        <span className="text-xs text-muted-foreground">github username:</span>
                        <Badge
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => window.open("https://github.com/kik-work", "_blank")}
                        >
                            kik-work
                        </Badge>
                    </div>

                </div>

                <div className="flex">
                    <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                            Total Commits <GitCommitHorizontal className="h-4 w-4 text-primary"/>
                        </span>
                        <span className="text-lg leading-none font-bold sm:text-3xl">
                            <TypographyH1 className="text-primary">{totalCommits.toLocaleString()}</TypographyH1>
                        </span>
                        <span className="text-xs text-muted-foreground">in the last year</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
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
                    <div className="flex space-x-1 overflow-x-auto min-w-max pb-8">
                        {weeks.map((week, i) => (
                            <div key={i} className="flex flex-col space-y-1 shrink-0">
                                {week.map((day, j) => (
                                    <Tooltip key={i + "-" + j}>
                                        <TooltipTrigger>
                                            <div
                                                className="w-4 h-4 rounded-xs cursor-pointer"
                                                style={{ backgroundColor: getColor(day.commits) }}
                                            />
                                        </TooltipTrigger>
                                        {day.date && (
                                            <TooltipContent>
                                                <div className="text-sm">
                                                    {day.commits} commit{day.commits !== 1 ? "s" : ""} on{" "}
                                                    {new Date(day.date).toLocaleDateString()}
                                                </div>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>


            </CardContent>

        </Card> 
        {/* Legend */}
            <div className="flex overflow-hidden items-center justify-end gap-1 mt-4 text-xs mb-5">
                <span className="text-muted-foreground">Less</span>
                <div className="flex gap-0.5">
                    {chartColors.map((color, i) => (
                        <div
                            key={i}
                            className="w-4 h-4 rounded-xs"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <span className="text-muted-foreground">More</span>
            </div></>

    )
}
