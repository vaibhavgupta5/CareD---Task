import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh bg-[#007EFF]/5 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#007EFF]/5">
        <div className="flex justify-center gap-2  md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Health Tracker
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted  rounded-xl relative hidden lg:block">
        <img
          src="https://etimg.etb2bimg.com/photo/88187625.cms"
          alt="Image"
          className="absolute inset-0 rounded-xl h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
