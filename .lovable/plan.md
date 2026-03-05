

## Fix Double X & Add Redeem Page

### 1. Remove duplicate X button in wallet modal

The `DialogContent` component in `src/components/ui/dialog.tsx` renders a built-in X close button (line 43-46), and `CustomWalletModal.tsx` adds a second one manually (lines 46-51). Fix: remove the custom X button from `CustomWalletModal.tsx` (lines 46-51) since the DialogContent already provides one.

### 2. Create Redeem page with functional redeem button

**Create `src/pages/Redeem.tsx`** — A page matching the app's layout with:
- A redeem card/form where users can input an amount of fragSOL (or similar restaked token) to redeem back to SOL
- Display current balance, exchange rate, and estimated output
- A "Redeem" button that, when wallet is connected, initiates the redemption (for now, shows a toast confirmation since there's no real contract)
- If wallet not connected, prompt to connect

**Update `src/App.tsx`** — Add a route for `/redeem` pointing to the new Redeem page component.

