import { useStore } from '../stores/index';

export function isAuthenticated() {
  const store = useStore();
  return !!store.user; // Return true if user is logged in, otherwise false
}
