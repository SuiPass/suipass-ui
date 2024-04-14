import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { rootStore } from "@/stores"
import { Button } from "."
import { useState } from "react"

export function InstallWalletExtensionDialog() {
  const open = rootStore.app.use.walletExtInstallDialogOpen()

  const [installBtnClicked, setInstallBtnClicked] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={(open) => {
      rootStore.app.set.walletExtInstallDialogOpen(open)
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Install the Sui Wallet Extension</AlertDialogTitle>
          <AlertDialogDescription>
            We recommend pinning Sui Wallet to your taskbar for quicker access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {
            installBtnClicked ? <Button onClick={() => window.location.reload()}>Reload and Sign in</Button> :
              <a href='https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil' target="_blank">
                <Button onClick={() => { setInstallBtnClicked(true) }}>Install</Button>
              </a>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
