"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Member } from "@/lib/schemas";

const chartConfig = {
  members: {
    label: "Members",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function MemberChart({ members }: { members: Member[] }) {
  const chartData = (() => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const startMonth = (currentMonth + 1) % 12;

    const chartData = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = (startMonth + index) % 12;
      const monthName = months[monthIndex];
      const startDate = new Date(currentYear, monthIndex, 1);
      const endDate = new Date(currentYear, monthIndex + 1, 0);

      const memberCount = members.filter((member) => {
        const createdAt = new Date(member.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      }).length;

      return { month: monthName, members: memberCount };
    });

    for (let i = 1; i < chartData.length; i++) {
      chartData[i].members += chartData[i - 1].members;
    }

    return chartData;
  })();

  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = new Date().getFullYear();
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const membersThisMonth = members.filter((member) => {
    const date = new Date(member.createdAt);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  const membersLastMonth = members.filter((member) => {
    const date = new Date(member.createdAt);
    return (
      date.getMonth() === previousMonth && date.getFullYear() === previousYear
    );
  }).length;

  let evolution =
    ((membersThisMonth - membersLastMonth) / membersLastMonth) * 100;

  if (isNaN(evolution)) {
    evolution = Infinity;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Membres</span>
        </CardTitle>
        <CardDescription>
          Voici le nombre de membres inscrits sur votre plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              allowDecimals={false}
              axisLine={false}
              tickCount={members.length + 1}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="members" fill="hsl(var(--primary))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Augmentation de{" "}
          <span className="text-primary font-medium">
            {evolution === Infinity ? 100 : evolution}%{" "}
          </span>
          ce mois-ci <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Nous montrons le nombre total de visiteurs pour les 12 derniers mois
        </div>
      </CardFooter>
    </Card>
  );
}
