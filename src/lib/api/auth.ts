export interface User {
  id: string
  name: string
  email: string
  phone?: string
  setupCompleted: boolean
}

// Dummy delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authApi = {
  async register(data: any) {
    await delay(1000)
    // Simulate successful registration
    return { success: true, message: "OTP sent successfully" }
  },

  async login(data: any) {
    await delay(1000)
    // Simulate check if setup is completed or not
    const isNewUser = data.email === "new@example.com"
    return {
      success: true,
      user: {
        id: "123",
        name: "Alex Student",
        email: data.email,
        setupCompleted: !isNewUser,
      },
      token: "dummy-token-123",
    }
  },

  async sendOtp(data: { phone: string }) {
    await delay(800)
    return { success: true, message: "OTP sent" }
  },

  async verifyOtp(data: { otp: string, phone?: string }) {
    await delay(1000)
    if (data.otp === "000000") {
      throw new Error("Invalid OTP")
    }
    return { success: true, message: "Phone verified successfully" }
  },

  async forgotPassword(data: { identifier: string }) {
    await delay(1000)
    return { success: true, message: "Reset code sent" }
  },

  async resetPassword(data: any) {
    await delay(1000)
    return { success: true, message: "Password reset successful" }
  },
  
  async updateProfile(data: any) {
    await delay(1500)
    return { success: true, message: "Profile updated" }
  }
}
