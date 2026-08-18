<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { onClickOutside } from "@vueuse/core";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const isOpen = ref(false);
const notificationContainer = ref(null);

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: "Pesanan berhasil",
    message: "Pesanan #ORD-12345 berhasil dibuat.",
    time: "5 menit lalu",
    read: false,
  },
  {
    id: 2,
    title: "Pembayaran diterima",
    message: "Pembayaran untuk pesanan #ORD-12344 telah diterima.",
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 3,
    title: "Promo baru",
    message: "Dapatkan diskon 20% untuk produk pilihan.",
    time: "2 jam lalu",
    read: true,
  },
]);

onClickOutside(notificationContainer, () => {
  closeNotification();
});

const unreadCount = computed(() => {
  return notifications.value.filter((notification) => !notification.read)
    .length;
});

function toggleNotification() {
  isOpen.value = !isOpen.value;
}

function closeNotification() {
  isOpen.value = false;
}

function markAsRead(notification: Notification) {
  notification.read = true;
}

function markAllAsRead() {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
}

// ESC untuk menutup
function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeNotification();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div ref="notificationContainer" class="relative">
    <!-- Bell Button -->
    <button
      type="button"
      class="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
      aria-label="Notifications"
      :aria-expanded="isOpen"
      @click="toggleNotification"
    >
      <Icon icon="mdi:bell-outline" size="24" />

      <span
        v-if="unreadCount > 0"
        class="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>

    <!-- ================================================= -->
    <!-- NOTIFICATION -->
    <!-- ================================================= -->

    <!-- <Teleport to="body"> -->
    <Transition
      enter-active-class="transition-opacity duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-50"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen">
        <!-- BACKDROP -->
        <div
          class="fixed inset-0 z-40 bg-black/40 sm:hidden"
          @click="closeNotification"
        />

        <!-- PANEL -->
        <div
          class="fixed inset-0 z-100 mx-auto flex flex-col bg-white sm:absolute sm:inset-auto sm:left-1/2 sm:top-full sm:mt-2 sm:-translate-x-1/2 sm:w-[380px] sm:rounded-xl sm:shadow-xl"
        >
          <!-- tonjolan -->
          <div
            class="absolute -top-2 left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-b-8 border-b-gray-200"
          ></div>

          <div
            class="absolute -top-[7px] left-1/2 -translate-x-1/2 border-x-[7px] border-x-transparent border-b-[7px] border-b-white"
          ></div>

          <!-- HEADER -->
          <div
            class="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4"
          >
            <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>

            <div class="flex items-center gap-3">
              <button
                v-if="unreadCount > 0"
                class="text-sm text-blue-600 hover:text-blue-700"
                @click="markAllAsRead"
              >
                Mark all as read
              </button>

              <!-- Close -->
              <button
                class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close notifications"
                @click="closeNotification"
              >
                <Icon icon="basil:cross-solid" size="24" />
              </button>
            </div>
          </div>

          <!-- LIST -->
          <div class="min-h-0 flex-1 overflow-y-auto sm:max-h-[500px]">
            <!-- EMPTY -->
            <div
              v-if="notifications.length === 0"
              class="flex min-h-[300px] items-center justify-center px-6 text-center"
            >
              <div>
                <div class="mb-3 text-4xl">🔔</div>

                <p class="font-medium text-gray-900">No notifications</p>

                <p class="mt-1 text-sm text-gray-500">You're all caught up.</p>
              </div>
            </div>

            <!-- NOTIFICATIONS -->
            <button
              v-for="notification in notifications"
              :key="notification.id"
              type="button"
              class="flex w-full gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50"
              :class="{
                'bg-blue-50/50': !notification.read,
              }"
              @click="markAsRead(notification)"
            >
              <!-- Status -->
              <div class="mt-1.5 shrink-0">
                <span
                  class="block h-2.5 w-2.5 rounded-full"
                  :class="notification.read ? 'bg-gray-300' : 'bg-blue-500'"
                />
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900">
                  {{ notification.title }}
                </p>

                <p class="mt-1 text-sm leading-5 text-gray-600">
                  {{ notification.message }}
                </p>

                <p class="mt-2 text-xs text-gray-400">
                  {{ notification.time }}
                </p>
              </div>
            </button>
          </div>

          <!-- FOOTER -->
          <div class="shrink-0 border-t border-gray-200 p-3 text-center">
            <NuxtLink
              to="/notifications"
              class="text-sm font-medium text-blue-600 hover:text-blue-700"
              @click="closeNotification"
            >
              View all notifications
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
    <!-- </Teleport> -->
  </div>
</template>
