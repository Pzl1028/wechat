// pages/brand/details/details.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: {  
    imgUrls: [ 
      // 'http://cdn.pengyoujuhui.com/16613789221035994.png',
      // 'http://cdn.pengyoujuhui.com/16613789221035994.png',
      // 'http://cdn.pengyoujuhui.com/16613789221035994.png'
      // 'http://116.62.162.19/youbao/upload/videos/上海依洁格力空调.mp4',
      // 'http://116.62.162.19/youbao/upload/videos/上海依洁格力空调.mp4',
      // 'http://116.62.162.19/youbao/upload/videos/上海依洁格力空调.mp4'
    ],
    indicatorDots: true,
    circular:false,
    circular:true,
    autoplay: true,
    interval: 2500,
    duration: 900,
    showModal:false,
    detailList:{},
    product_id:"",
    num:1,
    addcart:false,
    product_num:1
  },
  clickasd: function (o) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

    fuwushuom:function(){
      this.setData({
        showModala:true
      })
    },
  goout: function () {
    this.setData({
      showModala: false
    })
  },
    submit:function(){
      this.setData({
        showModal:true
      })
    },
    go:function(){
      this.setData({
        showModal:false
      })
    },
  minusCount() {
    let num = this.data.num;
    if(num >1){
      num--;
    }
    this.setData({
      num: num
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // Click through the merchandise to display data on the product details page.
    var product_id = options.product_id;

    // this.getData(product_id);
    console.log("icon_url="+options.icon_url)
    console.log(options.product_id)
    that.setData({
      icon_url: options.icon_url,
      product_id: product_id,
      product_name: options.product_name,
      product_price: options.product_price
    })
    // DETAIL MAP OF GOODS AND DETAILS SOWING MAP
    
    app.apiRequest('/product/getProductId', 'GET', {
        'product_id': product_id
      }, function (res) {
        console.log(res.data)
        console.log(res.data.productType)
        console.log(res.data.detailData)
        that.setData({
          detailList: res.data.detailData,
          banners: res.data.bannerData
        })
       
       
        //  var asd = res.data.bannerData.length
      //    var asd ="3"
      // let fdata=[];
      //  for(var i=0;i<3;i++){
      //   //  console.log(res.data[i].state)
      //    fdata.push({ 'picture_url': res.data.bannerData[i].picture_url },);
      //    console.log(fdata)
      //  }
        // that.setData({
      //        banners:fdata
      //   })
      });
  },

  // tian: function (e) {
  //   var that = this
  //   var product_id = that.data.product_id
  //   console.log(product_id)
  //   var create_member_id = wx.getStorageSync('memberId')
  //   console.log(create_member_id)
  //   var num = that.data.num
  //   console.log(num)
  //   let shopCart = { 
  //     'memberId': create_member_id, 
  //     'productAmount': num, 
  //     'productId': parseInt(product_id),  //
  //     // 'id':1,
  //     }
  //   console.log(shopCart)
  //   app.apiRequest('/shopCart/addMemberShopCart', ' GET', {
  //     'shopCart': shopCart
  //   }, function (res) {
  //     console.log(res.code)
  //     if (res.code == 200) {
  //       wx.showToast({
  //         title: '添加购物车成功！',
  //         icon: 'none',
  //         duration: 1000
  //       });
  //     } else {
  //       wx.showToast({
  //         title: '添加购物车失败',
  //         icon: 'none',
  //         duration: 2000
  //       });
  //     }
  //   })
  // },

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

  },
  
  addcart:function(){

    var that=this;
    var skuu = new Array();
    app.apiRequest('/product/getProductSku', 'GET', {
      'productId': that.data.product_id,
    },
   
      function (res) {
        
        console.log(res)
        if (res.data.length>0){
          for(var i=0;i<res.data.length;i++){
            skuu.push((res.data[i].key.val["0"].id)+"")    
          }
          var brede_context = new Array("无留言");
          var member_id = wx.getStorageSync('memberId');
          app.apiRequest('/shopCart/addMemberShopCart', 'POST', {
            shopCart: skuu,
            memberId: member_id,
            productId: that.data.product_id,
            productAmount: that.data.product_num,
            brede_context: "无留言"
          }, function (resa) {
            console.log('brede_context')
            console.log(brede_context)
            console.log(resa.code)
            console.log(resa.data.id)
            if (resa.code == 200) {
              console.log("加入购物车成功")
              wx.showModal({
                title: '',
                content: '加入购物车成功！',
                confirmText: '去结算',
                cancelText: '继续购物',
                cancelColor:'#4e7fa8',
                confirmColor:'#4e7fa8',
                success(res) {
                  if (res.confirm) {
                     wx.reLaunch({
                      url: '../../cart/cart',
                    })
                  } else if (res.cancel) {
                    that.setData({
                      addcart: false
                    })
                  }
                }
              })

              // wx.navigateTo({
              //   url: '../../cart/cart',
              //   // delta: 1
              // })
              // timer: setTimeout(function () {
              //   wx.reLaunch({
              //     url: '../../cart/cart',
              //   })
              // }, 1500);



            } else {
              console.log("加入购物车失败")
              wx.showToast({
                title: '加入购物车失败',
                icon: 'success',
                duration: 1000
              });
            }
          }) 
        }else{
          wx.showToast({
            title: '当前商品没有sku',
            icon: 'SUCCESS',
            duration: 0,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    )
    //

    
  },


  openaddcart: function () {
    this.setData({
      addcart: true
    })
  },

  colseaddcart:function(){
    this.setData({
      addcart: false
    })
  },

  addnum:function(){
    this.setData({
      product_num: this.data.product_num + 1
    })
  },
  Lessnum:function(){
    var num =this.data.product_num;
    if(num>1){
      this.setData({
        product_num: this.data.product_num - 1
      })
    }
  }

})