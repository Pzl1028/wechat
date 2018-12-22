// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: {},
    banner: {},
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    asdasd: "none",
    categoryList:[]
  },


  clicka: function () {
    var that = this
    that.setData({
      asdasd: "none"
    })
  },
  click: function (o) {
    wx.switchTab({
      url: '/pages/brand/brand',
    })
  },
  productDetail: function (e) {
    console.log("商品id为" + e.currentTarget.dataset.product_id)
    var product_id = e.currentTarget.dataset.product_id
    var product_price = e.currentTarget.dataset.product_price;
    var icon_url = e.currentTarget.dataset.icon_url;
    var product_name = e.currentTarget.dataset.product_name;
    wx.navigateTo({
      url: '/pages/brand/details/details?product_id=' + product_id + '&product_price=' + product_price + '&icon_url=' + icon_url + '&product_name=' + product_name
    });
  },
  /**
   * 生命周期函数--监听页面加载 加载商品
   */

  onLoad: function (options) {

    var that = this;

    //查看是否有红包
    var member_id = wx.getStorageSync('memberId')

    console.log("member_id为" + member_id);
    app.apiRequest('/Exchange/getExchangeId', 'GET', {
      member_id: member_id
    }, function (res) {
      console.log(res.data.length)
      if (res.data.length !== 0) {
        that.setData({
          asdasd: "none"
        })
      } else {
        that.setData({
          asdasd: "block"
        })
        // app.apiRequest('/Exchange/newCoupons', 'GET', {
        //   'memberId': member_id
        // }, function (res) {
        //   console.log(res.data.length)
        //   if (res.data.length < 3) {
        //     console.log("123")
        //     that.setData({
        //       asdasd: "boclk"
        //     })
        //   }
        // })
      }
    })

    // 首页推荐商品
    // app.apiRequest('/product/getProduct', 'GET', {
    //   'recommend': 1,
    //   'status':1
    // },
    // function(res){
    //   console.log(res.data)
    //   that.setData({
    //     productList: res.data
    //   })
    // });
    app.apiRequest('/category/getCompetitive', 'POST', {
    },
      function (res) {
        console.log(res.data)
        that.setData({
          competitive: res.data
        })
      });

   // 首页活动分类及分类商品
    app.apiRequest('/category/getHomeCategory', 'POST', {

    },
      function (res) {
        console.log("res.data")
        console.log(res.data[0])
        console.log(res.data[1])
        console.log(res.data[2])
        that.setData({
          categoryList: res.data
        })
      })

    // wx.request({
    //   method:"POST",
    //   url: 'https://www.pengyoujuhui.com/clothing/category/getHomeCategory',
    //   data:{

    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success:function(res){
    //     console.log(res);
    //   },
    //   fail:function(res){

    //   },
    //   complete:function(res){

    //   }
    // })




    // 首页banner
    app.apiRequest('/banner/getHomeBanner', 'GET', {
      'state': 1
    }, function (res) {
      console.log(res)
      // console.log(res.code)
      console.log(res.data)
      that.setData({
        banner: res.data
      })
      // var asd = res.data.length
      // let fdata=[];
      //  for(var i=0;i<asd;i++){
      //   //  console.log(res.data[i].state)
      //    if (res.data[i].state ==1){
      //      fdata.push({ 'banner_url': res.data[i].banner_url }, { 'banner_video': res.data[i].banner_video});
      //      that.setData({
      //        banner:fdata
      //      })
      //    }
      //  }
    });
  },
  //更多商品
  // more:function(){
  //   wx.navigateTo({
  //     url: '../home/moregoods/moregoods',
  //   })
  // },
  //领取红包
  lingquhongbao: function () {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    app.apiRequest('/Exchange/newCoupons', 'GET', {
      'member_id': member_id
    }, function (resdd) {
      console.log(resdd.code)
      console.log(resdd.data)
      if (resdd.data == "") {
        app.apiRequest('/Exchange/newCoupons', 'GET', {
        }, function (resq) {
          console.log(resq.data[0].ec_id)
          console.log(resq.data[1].ec_id)
          console.log(resq.data[2].ec_id)
          var aw = resq.data[0].ec_id
          var ae = resq.data[1].ec_id
          var ar = resq.data[2].ec_id
          let ec = []
          if (aw != 0) {
            ec.push(aw);
          }
          if (ae != 0) {
            ec.push(ae);
          }
          if (ar != 0) {
            ec.push(ar);
          }
          console.log(ec)
          var asas = ec
          console.log(asas)
          wx.setStorageSync("asas", asas)
          if (resq.data != "") {
            var asas = wx.getStorageSync('asas')
            console.log(asas)
            app.apiRequest('/Exchange/updateMember', 'POST', { //领取红包
              'ecids': asas + "",
              'member_id': member_id
            }, function (res) {
              console.log(res.code)
              console.log(res.data)
              that.setData({
                asdasd: "none"
              })
            })
          }
        })
      } else {
        let rwsqwer = "1"
        console.log(rwsqwer)
        wx.setStorageSync("rwsqwer", rwsqwer)
        that.setData({
          asdasd: "none"
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '上海羽琪科技文化创意中心技术支持',
      desc: '东方云服装定制小程序',
      path: ''
    }
  },

  getPhoneNumber: function (e) {
    //把这几个参数 再传给后端
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  app.apiRequest('/member/checkPhone','POST',{
      'iv':e.detail.iv,
      'encryptedData':e.encryptedData,
      'session_key':app.getStorageSync("session_key")
  },function(res){
      console.log(JSON.stringify(res));
  })
  }
})