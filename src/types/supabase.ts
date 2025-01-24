export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          image: string
          created_at?: string
        }
        Insert: {
          name: string
          description?: string
          price: number
          image: string
        }
        Update: {
          name?: string
          description?: string
          price?: number
          image?: string
        }
      }
    }
  }
}
