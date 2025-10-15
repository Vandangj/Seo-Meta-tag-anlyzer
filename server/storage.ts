// This app doesn't require persistent storage
// SEO analysis is performed on-demand without saving results

export interface IStorage {
  // No storage methods needed for this application
}

export class MemStorage implements IStorage {
  constructor() {
    // No initialization needed
  }
}

export const storage = new MemStorage();
