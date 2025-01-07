"use client"
import React from "react";
import Hero from "@/components/Hero";
import RaidProgress from "@/components/RaidProgress/RaidProgress";
import FeaturedRaidStats from "@/components/Featured/FeaturedPlayers";
import RaidCalendar from "@/components/RaidCalendar/RaidCalendar";




export default function Home() {
  return (
    <div className="flex flex-col  w-screen">
        <Hero />
        <RaidProgress />
        <FeaturedRaidStats />
        <RaidCalendar />
    </div>
  );
}
