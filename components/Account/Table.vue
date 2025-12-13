<script setup lang="ts">
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
</script>

<template>
  <SV-Table>
    <SV-TableHeader>
      <SV-TableRow>
        <SV-TableHead class="w-[100px]"> Invoice </SV-TableHead>
        <SV-TableHead>Status</SV-TableHead>
        <SV-TableHead>Method</SV-TableHead>
        <SV-TableHead class="text-right"> Amount </SV-TableHead>
      </SV-TableRow>
    </SV-TableHeader>
    <SV-TableBody>
      <SV-TableRow v-for="invoice in invoices" :key="invoice.invoice">
        <SV-TableCell class="font-medium">
          {{ invoice.invoice }}
        </SV-TableCell>
        <SV-TableCell>{{ invoice.paymentStatus }}</SV-TableCell>
        <SV-TableCell>{{ invoice.paymentMethod }}</SV-TableCell>
        <SV-TableCell class="text-right">
          {{ invoice.totalAmount }}
        </SV-TableCell>
      </SV-TableRow>
    </SV-TableBody>
    <SV-TableFooter>
      <SV-TableRow>
        <SV-TableCell colspan="3"> Total </SV-TableCell>
        <SV-TableCell class="text-right"> $2,500.00 </SV-TableCell>
      </SV-TableRow>
    </SV-TableFooter>
  </SV-Table>
</template>
