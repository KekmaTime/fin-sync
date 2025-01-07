import axios from 'axios'
import { env } from '@/config/env'

interface FinancialData {
  date: string
  revenue: number
  netIncome: number
  grossProfit: number
  eps: number
  operatingIncome: number
}

const BASE_URL = 'https://financialmodelingprep.com/api/v3'

export const financialApi = {
  async getAppleFinancials(): Promise<FinancialData[]> {
    try {
      const response = await axios.get(
        `${BASE_URL}/income-statement/AAPL?apikey=${env.apiKey}&limit=20`
      )
      
      return response.data.map((item: any) => ({
        date: item.date,
        revenue: item.revenue,
        netIncome: item.netIncome,
        grossProfit: item.grossProfit,
        eps: item.eps,
        operatingIncome: item.operatingIncome
      }))
    } catch (error) {
      console.error('Error fetching financial data:', error)
      throw error
    }
  }
} 