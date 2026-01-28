<template>
  <div>
    <div class="flex justify-end mb-5">
      <OverviewDialog @handleAddMember="addMember" />
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
    >
      <OverviewCard
        v-for="(card, idx) in cards"
        :key="idx"
        :title="card.title"
        :description="card.description"
        :content="card.content"
      />
    </div>
  </div>
</template>

<script setup>
const cards = ref([
  {
    title: "Team Member",
    description: "Invite your team members to collaborate.",
    content: "Jackson Lee: p@example.com",
  },
  {
    title: "Team Member",
    description: "Invite your team members to collaborate.",
    content: "Citra Lee: p@example.com",
  },
  {
    title: "Team Member",
    description: "Invite your team members to collaborate.",
    content: "Moli Lee: p@example.com",
  },
  {
    title: "Team Member",
    description: "Invite your team members to collaborate.",
    content: "Nelson Lee: p@example.com",
  },
]);

const addMember = (userName) => {
  const newUser = {
    title: "New Team",
    description: "Invite your team members to collaborate.",
    content: `${userName} ${userName}@example.com`,
  };
  cards.value.push(newUser);
};
</script>

<style lang="scss" scoped></style>
