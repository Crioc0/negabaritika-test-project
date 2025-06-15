<template>
  <div class="container">
    <h1>Установка тарифа</h1>

    <div class="form-group">
      <label for="tariff-select">Выберите тариф:</label>
      <select id="tariff-select" v-model="selectedTariff" class="tariff-select">
        <option value="" disabled>Выберите тариф</option>
        <option v-for="tariff in tariffsOptions" :key="tariff" :value="tariff">
          Тариф{{ tariff }}
        </option>
      </select>
    </div>

    <div class="qr-scanner-container">
      <div class="qr-scaner" v-if="!currentQrCode">
        <div class="qr-variant">
          <qrcode-stream @detect="onDetect" @init="onQrInit" />
        </div>
        <qrcode-drop-zone
          class="qr-variant"
          @detect="onDetect"
          @dragover="onDragOver"
          @init="onQrInit"
        >
          <div class="drop-area" :class="{ dragover: dragover }">Перетяните QR-код</div>
        </qrcode-drop-zone>
      </div>

      <div v-else class="qr-result">
        <p>Найден QR-код: {{ currentQrCode }}</p>
        <button @click="addQrCode">Добавить код</button>
        <button @click="resetCurrentQrCode">Сканировать заново</button>
      </div>
    </div>

    <div class="qr-list" v-if="qrCodes.length > 0">
      <h3>Добавленные QR-коды:</h3>
      <ul>
        <li v-for="(code, index) in qrCodes" :key="index">
          {{ code }}
          <button @click="removeQrCode(index)">Удалить</button>
        </li>
      </ul>
    </div>

    <button
      :disabled="!selectedTariff || qrCodes.length === 0"
      @click="applyTariff"
      class="apply-button"
    >
      Применить тариф
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'
import { QrcodeStream, QrcodeDropZone } from 'vue-qrcode-reader'
import { useTariffStore } from '@/stores/tariffStore'
import { toastService } from '@/services/toastService'

interface QrcodeResult {
  rawValue: string
}

const router = useRouter()
const tariffStore = useTariffStore()

const tariffsOptions = [1, 2, 3]

const dragover = ref(false)
const selectedTariff = ref<number | null>(null)
const currentQrCode = ref<string | null>(null)
const qrCodes = ref<string[]>([])

const onDetect = (result: QrcodeResult[]) => {
  console.log(result)
  currentQrCode.value = result[0].rawValue
}

const onDragOver = (isDraggingOver: boolean) => {
  dragover.value = isDraggingOver
}

const onQrInit = (error: Error | null) => {
  if (error) {
    console.error('Ошибка при инициализации сканера QR:', error)
  }
}

const resetCurrentQrCode = () => {
  currentQrCode.value = null
}

const addQrCode = () => {
  if (currentQrCode.value && !qrCodes.value.includes(currentQrCode.value)) {
    qrCodes.value.push(currentQrCode.value)
    currentQrCode.value = null
  } else {
    toastService.warning('Данный QR уже добавлен!')
  }
}

const removeQrCode = (index: number) => {
  qrCodes.value.splice(index, 1)
}

const applyTariff = async () => {
  if (!selectedTariff.value || qrCodes.value.length === 0) {
    return
  }

  await tariffStore.addTariff({
    val: Number(selectedTariff.value),
    qrs: toRaw(qrCodes.value),
    processed: false,
    created: new Date(),
  })

  router.push('/')
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tariff-select {
  padding: 0.5rem;
  font-size: 1rem;
}

.qr-scanner-container {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9f9f9;

  .qr-scaner {
    display: flex;
    gap: 0.5rem;
    @media (max-width: 880px) {
      flex-wrap: wrap;
    }
  }
  .qr-variant {
    width: 50%;
    @media (max-width: 880px) {
      width: 100%;
    }

    .drop-area {
      min-height: 100%;
      color: #fff;
      text-align: center;
      font-weight: bold;
      background-color: #3c3c43;
      @media (max-width: 880px) {
        height: 300px;
      }
    }

    .dragover {
      background-color: #10b981;
    }
  }
}

.qr-result {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.qr-list {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.qr-list ul {
  list-style-type: none;
  padding: 0;
}

.qr-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.apply-button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.apply-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
