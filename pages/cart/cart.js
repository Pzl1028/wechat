// page/component/new-pages/cart/cart.js
var app = getApp();
Page({
  data: {
    isSelect: false,
    selectProduct: [], //选中商品数组
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    // selected:false,
    num: 1,
    obj: {
      name: "hello"
    }
  },
  // 点击规格查看所点击的商品规格
  dainjgg: function() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/shopCart/getMemberShopCart', 'GET', {
      memberId: member_id,
      // memberId:1
    }, function(res) {
      wx.hideLoading();
      console.log(res.data)
      // console.log(res.data.sku)
      if (res.data == "") { //若购物车没有值此页面显示空
        that.setData({
          hasList: false,
        })
      } else {
        that.setData({
          hasList: true,
          carts: res.data
        });
        // this.getTotalPrice();
      }
    })
  },
  // 从数据库删除购当前物车商品信息
  sumbit: function(o) {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    var productid = o.target.id
    // if (this.data.selectProduct.length > 0) {

    //   var price = 0;
    //   for (var i = 0; i < this.data.selectProduct.length; i++) {
    //     if (o.target.id== this.data.selectProduct[i].shop_cart_id) {
    //       console.log("当前已选择的商品加一")
    //       price = this.data.selectProduct[i].product_price
    //       this.data.selectProduct.splice(i, i);
    //     }
    //   }
    //   // var totalPrice = this.data.;
    //   var selectProduct_price = parseInt(parseInt(this.data.totalPrice).toFixed(0)) - parseInt(parseInt(price).toFixed(0))
    //   this.setData({
    //     totalPrice: 0,
    //     isSelect:false
    //   })
    //   console.log(selectProduct_price)
    // }

    this.setData({
      totalPrice: 0,
      isSelect: false,
      selectProduct:[],
      selectAllStatus:false
    })

    app.apiRequest('/shopCart/deleteMemberShopCart', 'POST', {
      shopCartId: productid
    }, function(res) {
      console.log(res.code)
      if (res.code == 200) {
        wx.showToast({
          title: '删除成功',
          icon: 'loading',
          duration: 500
        });
        app.apiRequest('/shopCart/getMemberShopCart', 'GET', {
          memberId: member_id,
          // memberId: 1
        }, function(res) {
          console.log(res.data)
          if (res.data == "") { //若购物车没有值此页面显示空
            that.setData({
              hasList: false,
            })
          } else {
            that.setData({
              hasList: true,
              carts: res.data
            });
            // this.getTotalPrice();
          }
        })
      } else {
        console.log(res.code)
        wx.showToast({
          title: '删除失败！',
          icon: 'none'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function(options) {
  //   console.info(options)
  //   this.onLoad()
  // },
  onShow: function (options) {
    console.info(options)
  var that = this
  var member_id = wx.getStorageSync('memberId');
  console.log(member_id)
  app.apiRequest('/shopCart/getMemberShopCart', 'GET', {
    memberId: member_id,
  }, function (res) {
    console.log(res.data)
    if (res.data == "") { //若购物车没有值此页面显示空
      that.setData({
        hasList: false,
      })
    } else {
      that.setData({
        hasList: true,
        carts: res.data,
        isSelect:false,
        selectAllStatus:false,
        totalPrice:0,
        selectProduct:[]
      });
      // this.getTotalPrice();
    }
  })
  },

  /**
   * 当前商品选中事件
   */
  selectList: function(e) {
    // console.log(e)
    // console.log(this.data.carts[e.currentTarget.dataset.index])
    //  this.data.selectProduct.push(this.data.carts[e.currentTarget.dataset.index])
    //  console.log(this.data.selectProduct)
    // this.data.carts.push(e)
    // const index = e.currentTarget.dataset.index;
    // let carts = this.data.carts;
    // // let num = carts[index].product_amount;
    // // console.log(num)
    // const selected = carts[index].selected;
    // console.log(selected)
    // carts[index].selected = !selected;
    // this.setData({
    //   carts: carts
    // });
    // this.getTotalPrice();
  },
  checkChange: function(e) {
     console.log(e)
    this.data.selectProduct = [];
    if (e.detail.value.length > 0) {
      var price = 0;
      
      for (var i = 0; i < e.detail.value.length; i++) {
        console.log(e.detail.value[i]);
        if (this.data.carts.length > 0) {
          for (var j = 0; j < this.data.carts.length; j++) {
            if (e.detail.value[i] == this.data.carts[j].shop_cart_id) {
              console.log("找到")
              console.log(this.data.carts[j])
              this.data.selectProduct.push(this.data.carts[j]);
              price += (this.data.carts[j].product_price * this.data.carts[j].product_amount);
            }
          }
        }
      }
      console.log(price)
      this.setData({
        totalPrice: price.toFixed(2)
      })

    } else {
      this.setData({
        totalPrice: 0
      })
    }
  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    if (this.data.isSelect) {
      this.setData({
        isSelect: false
      })
    } else {
      this.setData({
        isSelect: true
      })
    }
    if (this.data.selectAllStatus) {
      this.setData({
        selectAllStatus: false,
        totalPrice: 0
      })
    } else {
      var price = 0;
      for (var i = 0; i < this.data.carts.length; i++) {
        price += (this.data.carts[i].product_price * this.data.carts[i].product_amount);
      }
      console.log(price)
      this.setData({
        totalPrice: price.toFixed(2),
        selectAllStatus: true,
        selectProduct: this.data.carts
      })
    }

    // let selectAllStatus = this.data.selectAllStatus;
    // selectAllStatus = !selectAllStatus;
    // let carts = this.data.carts;
    // // var a = this.data.product_amount;
    // // console.log(a)
    // for (let i = 0; i < carts.length; i++) {
    //   carts[i].selected = selectAllStatus;
    //   console.log(carts[i].selected)
    // }
    // this.setData({
    //   selectAllStatus: selectAllStatus,
    //   carts: carts
    // });
    // this.getTotalPrice();

  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    console.log(e)
    var carts = this.data.carts;
    let num = this.data.carts[index].product_amount;
    num = num + 1;
    console.log(num);
    carts[index].product_amount = num;
    this.setData({
      carts: carts
    });
    // this.getTotalPrice();
    if (this.data.selectProduct.length > 0) {

      var price = 0;
      for (var i = 0; i < this.data.selectProduct.length; i++) {
        if (e.currentTarget.dataset.product.shop_cart_id == this.data.selectProduct[i].shop_cart_id) {
          console.log("当前已选择的商品加一")
          price = this.data.selectProduct[i].product_price
          this.data.selectProduct[i].product_amount = num
          console.log(e.currentTarget.dataset.product.product_amount);
        }
      }
      // var totalPrice = this.data.;
      this.setData({
        totalPrice: ((parseFloat(this.data.totalPrice) * 1000 + parseFloat(price) * 1000) / 1000).toFixed(2)
      })
    }
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    console.log(e)
    var carts = this.data.carts;
    let num = this.data.carts[index].product_amount;
    if (num > 1) {
      num = num - 1;
      carts[index].product_amount = num;
      this.setData({
        carts: carts
      });
      console.log(num)
      // this.getTotalPrice();
      if (this.data.selectProduct.length > 0) {

        var price = 0;
        for (var i = 0; i < this.data.selectProduct.length; i++) {
          if (e.currentTarget.dataset.product.shop_cart_id == this.data.selectProduct[i].shop_cart_id) {
            console.log("当前已选择的商品减一")
            price = this.data.selectProduct[i].product_price
            this.data.selectProduct[i].product_amount = num
          }
        }
        // var totalPrice = this.data.;
        this.setData({
          totalPrice: ((parseFloat(this.data.totalPrice) * 1000 - parseFloat(price) * 1000) / 1000) > 0 ? ((parseFloat(this.data.totalPrice) * 1000 - parseFloat(price) * 1000) / 1000).toFixed(2) : 0.01
        })
      }
    } else {

    }
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].product_amount * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //购物车传值
  buyCart: function(e) {
    var selected_list = [];
    // 取出商品总价
    var total = this.data.totalPrice;
    // var list = this.data.carts;
    // for (var i = 0; i < list.length; i++) {
    //   var selected = list[i].selected;
    //   // console.log(selected)
    //   if (selected === true) {
    //     // var selected_list = list[i]
    //     selected_list.push(list[i]);
    //     console.log(selected_list)
    //     // console.log(selected)
    //   }
    // }
    // app.globalData.selected_list = selected_list;

    console.log(total)
    if (total == 0) {
      wx.showModal({
        title: '请选择商品',
        content: '',
      })
    } else {
      wx.setStorageSync('selectProduct', this.data.selectProduct)
      wx.navigateTo({

        url: '/pages/payorder/payorder?total=' + total + '&memberId=' + wx.getStorageSync('memberId')

      })
    }

    // console.log(list)
    // var mun = this.data.product_amount;
    // console.log(mun)
    // console.log(total)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '上海羽琪科技文化创意中心技术支持',
      desc: '东方云服装定制小程序',
      path: ''
    }
  }

  
})