// page/component/new-pages/cart/cart.js
var app = getApp();
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    // selected:false,
    num: 1,
    obj: {
      name: "hello"
    },
    startX:0,//开始坐标
    startY:0,
  },

  // 点击规格查看所点击的商品规格
  dainjgg: function () {
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/shopCart/getMemberShopCart', 'GET', {
      memberId: member_id,
      // memberId:1
    }, function (res) {
      console.log(res.data)
      // console.log(res.data.sku)
      if (res.data == "") { //若购物车没有值此页面显示空
        that.setData({
          hasList: false,
        })
      } else {
        that.setData({
          hasList: true,
          carts: res.data,
          isTouchMove:false//隐藏删除按钮
        });
        // this.getTotalPrice();
      }
    });

  },
//手动触摸动作开始，记录七点X坐标
touchstart:function(e){
//开始触摸时重置所有删除

},







  // 从数据库删除购当前物车商品信息
  sumbit: function (o) {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    var productid = o.target.id
    app.apiRequest('/shopCart/deleteMemberShopCart', 'POST', {
      shopCartId: productid
    }, function (res) {
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
        }, function (res) {
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
  onShow() {
    var that = this
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/shopCart/getMemberShopCart', 'GET', {
      memberId: member_id,
      // memberId:1
    }, function (res) {
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

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    // let num = carts[index].product_amount;
    // console.log(num)
    const selected = carts[index].selected;
    console.log(selected)
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    // var a = this.data.product_amount;
    // console.log(a)
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
      console.log(carts[i].selected)
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index)
    let carts = this.data.carts;
    let num = carts[index].product_amount;
    num = num + 1;
    carts[index].product_amount = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].product_amount;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].product_amount = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].product_amount * carts[i].product_price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //购物车传值
  buyCart: function (e) {
    var selected_list = [];
    // 取出商品总价
    var total = this.data.totalPrice;
    var list = this.data.carts;
    for (var i = 0; i < list.length; i++) {
      var selected = list[i].selected;
      // console.log(selected)
      if (selected === true) {
        // var selected_list = list[i]
        selected_list.push(list[i]);
        console.log(selected_list)
        // console.log(selected)
      }
    }
    app.globalData.selected_list = selected_list;
    wx.navigateTo({
      url: '/pages/korder/korder?total=' + total
    })
    // console.log(list)
    // var mun = this.data.product_amount;
    // console.log(mun)
    // console.log(total)
  },
})