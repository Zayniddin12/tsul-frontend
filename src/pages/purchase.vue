<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-12 gap-[24px] mb-[64rem] mt-[32px]">
        <div class="col-span-9 -1240:col-span-12">
          <PageTitle :title="$t('shopping')" />

          <div class="w-full">
            <div v-if="pending" class="flex items-center md:justify-center flex-wrap gap-[22px]">
              <ShoppingCardPr v-for="(item, index) in purchase" :key="index" />
            </div>
            <div
              v-else-if="purchase && purchase.length"
              class="grid grid-cols-3 -950:grid-cols-2 -630:grid-cols-1 items-center justify-center gap-[22px] mt-[32px]"
            >
              <shopping-card
                v-for="(item, index) in purchase"
                :key="index"
                :order="item.id"
                :days="item.publish_date"
                :time="item.publish_date"
                :title="item.title"
                :deadline="item.event_date"
                :salary="numberWithSpaces(item.price)"
                @click="menuDialog(item)"
              />
            </div>
            <div v-else><NoData class="w-full mx-auto" /></div>
          </div>

          <div v-if="purchase && purchase.length" class="flex items-center justify-end mt-[24rem]">
            <Pagination :total="total" @current-page="page = $event" />
          </div>

          <div class="dialogWindow relative">
            <el-dialog v-model="openDialog">
              <Icon
                name="close_modal"
                color="#FFFFFF"
                class="transition cursor-pointer absolute top-[-34px] right-[11px]"
                @click="openDialog = false"
              />
              <h4
                class="text-[#1A2F53] minion font-bold text-[32rem] sm:text-[20rem] leading-[130%] word-break"
              >
                {{ modalTitle }}
              </h4>
              <p
                class="text-[#344666] text-[15rem] sm:text-[13rem] mt-[12px] font-normal leading-[140%] break-words word-break"
              >
                {{ modalContent }}
              </p>

              <div class="modal-table">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">
                        {{ $t("name_of_the_purchased_product_or_service") }}
                      </th>
                      <th scope="col">{{ $t("source_of_funding") }}</th>
                      <th scope="col">{{ $t("type_of_purchase") }}</th>
                      <th scope="col">{{ $t("number_of_lot") }}</th>
                      <th scope="col">{{ $t("price_of_goods_services") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td :data-label="$t('name_of_the_purchased_product_or_service')">
                        <span class="break-words">{{ namePurchasedProduct }}</span>
                      </td>
                      <td :data-label="$t('source_of_funding')">
                        {{ sourceOfFunding }}
                      </td>
                      <td :data-label="$t('type_of_purchase')">
                        {{ typeOfPurchase }}
                      </td>
                      <td :data-label="$t('number_of_lot')">
                        {{ numberOfLot }}
                      </td>
                      <td :data-label="$t('price_of_goods_services')">
                        {{ priceOfGoodsServices }} SUM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-dialog>
          </div>
        </div>
        <div class="col-span-3 -1240:col-span-12">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCard from "@/components/cards/ShoppingCard.vue";
import { mapState } from "vuex";
export default {
  components: { ShoppingCard },

  data() {
    return {
      openDialog: false,
      // modalka datas
      modalTitle: "",
      modalContent: "",
      namePurchasedProduct: "",
      sourceOfFunding: "",
      typeOfPurchase: "",
      numberOfLot: "",
      priceOfGoodsServices: "",
      // modalka datas
      purchase: [],
      total: undefined,
      page: 1,
      pending: false,
    };
  },
  computed: {
    ...mapState({
      post: (state) => state.post.post,
    }),
  },

  watch: {
    async page() {
      this.pending = true;
      await this.$store
        .dispatch("fetchPost", { type: "purchases", page: this.page })
        .then(() => {
          this.purchase = this.post;
        })
        .finally(() => {
          this.pending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "purchases",
      }),
    ])
      .then((res) => {
        this.purchase = res[0].value.data.results;
        this.total = res[0].value.data.total_pages;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.purchase"));
      });
  },

  methods: {
    menuDialog(item) {
      this.modalTitle = item.title;
      this.modalContent = item.description;
      this.openDialog = true;
      this.namePurchasedProduct = item.title;
      this.sourceOfFunding = item.funding_source;
      this.typeOfPurchase = item.purchase_type;
      this.numberOfLot = item.lot_number;
      this.priceOfGoodsServices = this.numberWithSpaces(item.price);
    },
  },
};
</script>

<style lang="scss">
.word-break {
  word-break: break-word;
}

.dialogWindow {
  .el-dialog {
    --el-dialog-width: 80% !important;
    transform: translate(-50%, -70%) !important;
    //  max-height: 700px !important;
  }

  .el-dialog__body {
    padding-top: 0 !important;
  }

  .el-dialog__headerbtn {
    i {
      opacity: 0 !important;
    }

    &::after {
      content: url("@/static/img/cancel-icon.png");
      position: absolute;
      top: -47px;
    }
  }
}

.modal-table {
  margin-top: 32px;
  max-height: 350px !important;
  overflow-y: scroll;

  table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
    overflow: hidden;

    body {
      tr {
        td {
          display: block !important;
          word-break: break-word !important;
        }
      }
    }
  }

  table tr {
    background-color: #f5f6fa;
    border: none;
    padding: 0.35em;
  }

  table th,
  table td {
    background-color: #f5f6fa;
    padding: 0.625em;
    text-align: center;
    word-break: break-word;
  }

  table th {
    background-color: #1a2f53;
    padding: 0.625em;
    text-align: center;
    color: #ffffff;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
    line-height: 20px;
  }

  @media screen and (max-width: 600px) {
    table {
      border: 0;
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    table td {
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 0.8em;
      text-align: right;
    }

    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
}
</style>
