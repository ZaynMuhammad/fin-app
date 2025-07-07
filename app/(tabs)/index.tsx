import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

interface CycleData {
  phase: "menstrual" | "follicular" | "ovulation" | "luteal";
  day: number;
  isCurrent: boolean;
}

interface MoonPhase {
  phase:
    | "new"
    | "waxing-crescent"
    | "first-quarter"
    | "waxing-gibbous"
    | "full"
    | "waning-gibbous"
    | "last-quarter"
    | "waning-crescent";
  day: number;
  isCurrent: boolean;
}

export default function HomeScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("week");
  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(1);

  const weekDays = [
    { day: "M", count: 0, date: "2024-01-15" },
    { day: "T", count: 0, date: "2024-01-16" },
    { day: "W", count: 3, date: "2024-01-17" },
    { day: "T", count: 0, date: "2024-01-18" },
    { day: "F", count: 0, date: "2024-01-19" },
    { day: "S", count: 0, date: "2024-01-20" },
    { day: "S", count: 0, date: "2024-01-21" },
  ];

  const cycleData: CycleData[] = [
    { phase: "menstrual", day: 1, isCurrent: false },
    { phase: "menstrual", day: 2, isCurrent: false },
    { phase: "menstrual", day: 3, isCurrent: false },
    { phase: "menstrual", day: 4, isCurrent: false },
    { phase: "menstrual", day: 5, isCurrent: false },
    { phase: "follicular", day: 6, isCurrent: false },
    { phase: "follicular", day: 7, isCurrent: false },
    { phase: "follicular", day: 8, isCurrent: false },
    { phase: "follicular", day: 9, isCurrent: false },
    { phase: "follicular", day: 10, isCurrent: false },
    { phase: "follicular", day: 11, isCurrent: false },
    { phase: "follicular", day: 12, isCurrent: false },
    { phase: "follicular", day: 13, isCurrent: false },
    { phase: "ovulation", day: 14, isCurrent: true },
    { phase: "luteal", day: 15, isCurrent: false },
    { phase: "luteal", day: 16, isCurrent: false },
    { phase: "luteal", day: 17, isCurrent: false },
    { phase: "luteal", day: 18, isCurrent: false },
    { phase: "luteal", day: 19, isCurrent: false },
    { phase: "luteal", day: 20, isCurrent: false },
    { phase: "luteal", day: 21, isCurrent: false },
    { phase: "luteal", day: 22, isCurrent: false },
    { phase: "luteal", day: 23, isCurrent: false },
    { phase: "luteal", day: 24, isCurrent: false },
    { phase: "luteal", day: 25, isCurrent: false },
    { phase: "luteal", day: 26, isCurrent: false },
    { phase: "luteal", day: 27, isCurrent: false },
    { phase: "luteal", day: 28, isCurrent: false },
  ];

  const moonPhases: MoonPhase[] = [
    { phase: "new", day: 1, isCurrent: false },
    { phase: "waxing-crescent", day: 2, isCurrent: false },
    { phase: "waxing-crescent", day: 3, isCurrent: false },
    { phase: "waxing-crescent", day: 4, isCurrent: false },
    { phase: "waxing-crescent", day: 5, isCurrent: false },
    { phase: "waxing-crescent", day: 6, isCurrent: false },
    { phase: "first-quarter", day: 7, isCurrent: false },
    { phase: "waxing-gibbous", day: 8, isCurrent: false },
    { phase: "waxing-gibbous", day: 9, isCurrent: false },
    { phase: "waxing-gibbous", day: 10, isCurrent: false },
    { phase: "waxing-gibbous", day: 11, isCurrent: false },
    { phase: "waxing-gibbous", day: 12, isCurrent: false },
    { phase: "waxing-gibbous", day: 13, isCurrent: false },
    { phase: "full", day: 14, isCurrent: true },
    { phase: "waning-gibbous", day: 15, isCurrent: false },
    { phase: "waning-gibbous", day: 16, isCurrent: false },
    { phase: "waning-gibbous", day: 17, isCurrent: false },
    { phase: "waning-gibbous", day: 18, isCurrent: false },
    { phase: "waning-gibbous", day: 19, isCurrent: false },
    { phase: "waning-gibbous", day: 20, isCurrent: false },
    { phase: "last-quarter", day: 21, isCurrent: false },
    { phase: "waning-crescent", day: 22, isCurrent: false },
    { phase: "waning-crescent", day: 23, isCurrent: false },
    { phase: "waning-crescent", day: 24, isCurrent: false },
    { phase: "waning-crescent", day: 25, isCurrent: false },
    { phase: "waning-crescent", day: 26, isCurrent: false },
    { phase: "waning-crescent", day: 27, isCurrent: false },
    { phase: "new", day: 28, isCurrent: false },
  ];

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "menstrual":
        return "#FF6B6B";
      case "follicular":
        return "#4ECDC4";
      case "ovulation":
        return "#FFE66D";
      case "luteal":
        return "#A8E6CF";
      default:
        return "#D3D3D3";
    }
  };

  const getMoonIcon = (phase: string) => {
    switch (phase) {
      case "new":
        return "moon-outline";
      case "waxing-crescent":
        return "moon-outline";
      case "first-quarter":
        return "moon-outline";
      case "waxing-gibbous":
        return "moon-outline";
      case "full":
        return "moon";
      case "waning-gibbous":
        return "moon-outline";
      case "last-quarter":
        return "moon-outline";
      case "waning-crescent":
        return "moon-outline";
      default:
        return "moon-outline";
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [1, 0.8],
        Extrapolate.CLAMP
      ),
    };
  });

  const totalEarnings = weekDays.reduce((sum, day) => sum + day.count, 0);
  const averagePerDay = totalEarnings / weekDays.length;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Animated.View style={headerAnimatedStyle} className="px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Welcome back</Text>
            <Text className="text-gray-400 text-base">
              Track your earnings & cycles
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center">
            <Ionicons name="notifications-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl p-6 mb-6"
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg opacity-90">
                This Week's Earnings
              </Text>
              <Text className="text-white text-3xl font-bold">
                ${totalEarnings}
              </Text>
              <Text className="text-white opacity-80">
                ${averagePerDay.toFixed(1)} avg/day
              </Text>
            </View>
            <View className="w-16 h-16 bg-white bg-opacity-20 rounded-full items-center justify-center">
              <Ionicons name="cash-outline" size={30} color="white" />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">
              Weekly Overview
            </Text>
            <View className="flex-row bg-gray-800 rounded-full p-1">
              {(["week", "month", "year"] as const).map((period) => (
                <TouchableOpacity
                  key={period}
                  onPress={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-full ${
                    selectedPeriod === period
                      ? "bg-purple-600"
                      : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedPeriod === period ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-gray-900 rounded-2xl p-4">
            <View className="flex-row justify-between mb-4">
              {weekDays.map((day, index) => (
                <View key={index} className="items-center">
                  <Text className="text-gray-400 text-sm mb-2">{day.day}</Text>
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      day.count > 0 ? "bg-purple-600" : "bg-gray-700"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        day.count > 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {day.count}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Cycle Tracking
          </Text>
          <View className="bg-gray-900 rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-medium">
                Current Phase
              </Text>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></View>
                <Text className="text-yellow-400 font-medium">Ovulation</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              {cycleData.slice(0, 7).map((day, index) => (
                <View key={index} className="items-center">
                  <View
                    className={`w-6 h-6 rounded-full mb-1 ${
                      day.isCurrent ? "bg-yellow-400" : "bg-gray-700"
                    }`}
                    style={{
                      backgroundColor: day.isCurrent
                        ? "#FDE047"
                        : getPhaseColor(day.phase),
                    }}
                  />
                  <Text className="text-gray-400 text-xs">{day.day}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity className="bg-purple-600 rounded-xl py-3 items-center">
              <Text className="text-white font-medium">View Full Cycle</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Moon Phase
          </Text>
          <View className="bg-gray-900 rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-medium">
                Current Moon
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="moon" size={20} color="#FDE047" />
                <Text className="text-yellow-400 font-medium ml-2">
                  Full Moon
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              {moonPhases.slice(0, 7).map((moon, index) => (
                <View key={index} className="items-center">
                  <View
                    className={`w-6 h-6 rounded-full mb-1 items-center justify-center ${
                      moon.isCurrent ? "bg-yellow-400" : "bg-gray-700"
                    }`}
                  >
                    <Ionicons
                      name={getMoonIcon(moon.phase) as any}
                      size={12}
                      color={moon.isCurrent ? "#000" : "#9CA3AF"}
                    />
                  </View>
                  <Text className="text-gray-400 text-xs">{moon.day}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity className="bg-purple-600 rounded-xl py-3 items-center">
              <Text className="text-white font-medium">View Moon Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-gray-900 rounded-2xl p-4 flex-1 mr-3 items-center">
              <View className="w-12 h-12 bg-purple-600 rounded-full items-center justify-center mb-3">
                <Ionicons name="add" size={24} color="white" />
              </View>
              <Text className="text-white font-medium">Add Earnings</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-900 rounded-2xl p-4 flex-1 ml-3 items-center">
              <View className="w-12 h-12 bg-pink-600 rounded-full items-center justify-center mb-3">
                <Ionicons name="calendar" size={24} color="white" />
              </View>
              <Text className="text-white font-medium">Log Cycle</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">
            Insights
          </Text>
          <View className="bg-gray-900 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <Ionicons name="trending-up" size={20} color="#10B981" />
              <Text className="text-green-400 font-medium ml-2">
                Best Earning Days
              </Text>
            </View>
            <Text className="text-gray-300 text-sm mb-4">
              You earn 40% more during ovulation and full moon phases
            </Text>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#F59E0B" />
              <Text className="text-yellow-400 font-medium ml-2">
                Next Peak Period
              </Text>
            </View>
            <Text className="text-gray-300 text-sm">
              Expected in 14 days - plan your schedule accordingly
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
