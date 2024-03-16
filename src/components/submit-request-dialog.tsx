import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubmitRequestDialog } from '@/hooks';

export function SubmitRequestDialog() {
  const { open, mutation, setOpen, submitButtonOnClick } = useSubmitRequestDialog();

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Request</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <h3>GitHub</h3>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={submitButtonOnClick}
            isLoading={mutation.isPending}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
