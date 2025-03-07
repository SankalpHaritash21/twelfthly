import { apiClient } from "./apiClient"

export const getGoals = async (cycleId) => {
  const response = await apiClient.get("/goals", { params: { cycleId } })
  return response.data
}

export const createGoal = async (goal) => {
  const response = await apiClient.post("/goals", goal)
  return response.data
}

export const updateGoal = async (goal) => {
  const response = await apiClient.put(`/goals/${goal._id}`, goal)
  return response.data
}

export const deleteGoal = async (goalId) => {
  const response = await apiClient.delete(`/goals/${goalId}`)
  return response.data
}
