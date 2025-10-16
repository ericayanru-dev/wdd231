// js/data.js
export async function fetchWorkouts() {
  try {
    const res = await fetch('data/workouts.json', { cache: "no-store" });
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to load workouts:', err);
    throw err;
  }
}
