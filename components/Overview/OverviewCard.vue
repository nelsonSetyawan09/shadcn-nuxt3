<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  content: string;
}

const { title, description, content } = defineProps<Props>();
</script>

<template>
  <SV-Card
    class="transition ease-out duration-200 hover:-translate-y-1 hover:shadow-xl"
  >
    <SV-CardHeader>
      <SV-CardTitle>{{ title }}</SV-CardTitle>
      <SV-CardDescription>{{ description }}</SV-CardDescription>
    </SV-CardHeader>
    <SV-CardContent>
      <p>{{ content }}</p>
    </SV-CardContent>
    <SV-CardFooter>
      <SV-Button
        class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800"
      >
        Show Detail
      </SV-Button>
    </SV-CardFooter>
  </SV-Card>
</template>
