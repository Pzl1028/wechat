// pages/brand/ljgmx/ljgmx.js
var app = getApp();
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    num: 1, 
    ljgmx: "", 
    ljgmx1: "",
    ljgmx2: "",
    ljgmx3: "",
    ljgmx4: "",
    ljgmx5: "",
    ljgmx6: "",
    ljgmx7: "",
    ljgmx8: "",
    a: [],
    product_id:"",
    val: {},
    val: "",
    key: "",
    status: 0,
    ace: "",
    tipsshow: {}, tipsshow1: "", tipsshow2: "", tipsshow3: "", tipsshow4: "", tipsshow5: "", tipsshow6: "", tipsshow7: "",
    id:"",
    abb:"",
    abc:"",
    abd:"",
    abe:"",
    abf:"",
    abg:"",
    abh:""

  },
  // Commodity addition and reduction
  minusCount() {
    let num = this.data.num;
    if (num > 1) {
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

  click: function (e) {
    var ids = e.target.dataset.id;
    console.log(ids)
    this.setData({
      id: ids,
    })
  },
  click1: function (e) {
    var ids1 = e.target.dataset.abb;
    console.log(ids1)
    this.setData({
      abb: ids1,
    })
  },
  click2: function (e) {
    var ids2 = e.target.dataset.abc;
    console.log(ids2)
    this.setData({
      abc: ids2,
    })
  },
  click3: function (o) {
    var ids3 = o.target.dataset.abd;
    console.log(ids3)
    this.setData({
      abd: ids3,
    })
  },
  click4: function (o) {
    var ids4 = o.target.dataset.abe;
    console.log(ids4)
    this.setData({
      abe: ids4,
    })
  },
  click5: function (o) {
    var ids5 = o.target.dataset.abf;
    console.log(ids5)
    this.setData({
      abf: ids5,
    })
  },
  click6: function (o) {
    var ids6 = o.target.dataset.abg;
    console.log(ids6)
    this.setData({
      abg: ids6,
    })
  },
  click7: function (o) {
    var ids7 = o.target.dataset.abh;
    console.log(ids7)
    this.setData({
      abh: ids7,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var product_id = options.id;

    console.log(product_id)
    that.setData({
      product_id: product_id
    });
    app.apiRequest('/product/getProductSku', 'GET', {
      'productId': product_id,
    },
      function (res) {
        console.log("寄哪里了")
        console.log(res.data)
        console.log(res.data[1].key.val.length)
        var asa = res.data[0].key.val.length
        var asb = res.data[1].key.val.length
        var asc = res.data[2].key.val.length
        var asd = res.data[3].key.val.length
        var ase = res.data[4].key.val.length
        var asf = res.data[5].key.val.length
        var asg = res.data[6].key.val.length
        var ash = res.data[7].key.val.length
        if(asa !==0){that.setData({ljgmx: res.data[0]})}else{that.setData({tipsshow: "none"})};
        if(asb !==0){that.setData({ljgmx1: res.data[1]})}else{that.setData({tipsshow1: "none"})};
        if(asc !==0){that.setData({ljgmx2: res.data[2]})}else{that.setData({tipsshow2: "none"})};
        if(asd !==0){that.setData({ljgmx3: res.data[3]})}else{that.setData({tipsshow3: "none"})};
        if(ase !==0){that.setData({ljgmx4: res.data[4]})}else{that.setData({tipsshow4: "none"})};
        if(asf !==0){that.setData({ljgmx5: res.data[5]})}else{that.setData({tipsshow5: "none"})};
        if(asg !==0){that.setData({ljgmx6: res.data[6]})}else{that.setData({tipsshow6: "none"})};
        if(ash !==0){that.setData({ljgmx7: res.data[7]})}else{that.setData({tipsshow7: "none"})};
        // if(asc !==0) { that.setData({ ljgmx2: res.data[2] }) } else { that.setData({ tipsshow2: "none" }) };
        // if(asc !==0) { that.setData({ ljgmx2: res.data[2] }) } else { that.setData({ tipsshow2: "none" }) };
        // if(asc !==0) { that.setData({ ljgmx2: res.data[2] }) } else { that.setData({ tipsshow2: "none" }) };
        // that.setData({
        //   ljgmx6: res.data[6]
        // })
        if(res.data.length>0){
          that.setData({
            id: res.data["0"].key.val["0"].id,
            abb: res.data["1"].key.val["0"].id,
            abc: res.data["2"].key.val["0"].id,
            abd: res.data["3"].key.val["0"].id,
            abe: res.data["4"].key.val["0"].id,
            abf: res.data["5"].key.val["0"].id,
            abg: res.data["6"].key.val["0"].id,
            abh: res.data["7"].key.val["0"].id,
          })
        }
      });
    // 查询是否有量体信息
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/custom/newCustom', 'GET', {
      'state': 1,
      'memberId': member_id
    },
      function (res) {
        console.log(res.data)
        if (res.code == 200) {
          that.setData({
            ace: res.data.cus[0].name
          })
        } else if (res.code !== 200){
          that.setData({
            ace: "+ 添加尺寸"
          })
        }
      });
  },
  // 立即购买
  clickasd: function (e) {
    var that = this
    var product_id = that.data.product_id
    console.log(product_id)
    var member_id = wx.getStorageSync('memberId');  //
    console.log(member_id)
    var num = that.data.num //
    var id = that.data.id
    var abb = that.data.abb
    var abc = that.data.abc
    var abd = that.data.abd
    var abe = that.data.abe
    var abf = that.data.abf
    var abg = that.data.abg
    var abh = that.data.abh
    let skuu = []
    if (id !== undefined) { skuu.push(id); }
    if (abb !== undefined) { skuu.push(abb); }
    if (abc !== undefined) { skuu.push(abc); }
    if (abd !== undefined) { skuu.push(abd); }
    if (abe !== undefined) { skuu.push(abe); }
    if (abf !== undefined) { skuu.push(abf); }
    if (abg !== undefined) { skuu.push(abg); }
    if (abh !== undefined) { skuu.push(abh); }
    console.log(skuu)
    app.apiRequest('/custom/getMemberCustom', 'GET', {
      'memberId': member_id,
      // 'memberId': 1,
    }, function (res) {
      if (res.data == ""){
        wx.showToast({
          title: '请选择身体尺寸',
          icon: 'none',
          duration: 1000
        });
      }else{
        app.apiRequest('/shopCart/addMemberShopCart','POST',{
          shopCart: skuu + "",
          memberId: member_id,
          productId: product_id,
          productAmount: num
        },function(resa){
          if(resa.code ==200){
            console.log("加入购物车成功")
            wx.showToast({
              title: '加入购物车成功',
              icon: 'none',
              duration: 1000
            });
            wx.navigateBack({
              delta: 1
            })
          }else{
            console.log("加入购物车失败")
            wx.showToast({
              title: '加入购物车失败',
              icon: 'none',
              duration: 1000
            });
          }
        })       
      }
    });
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
    var that =this
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/custom/newCustom', 'GET', {
      'state': 1,
      'memberId': member_id
    },
      function (res) {
        console.log(res.data)
        if (res.code == 200) {
          that.setData({
            ace: res.data.cus[0].name
          })
        } else if (res.code !== 200) {
          that.setData({
            ace: "+ 添加尺寸"
          })
        }
      });
  },

  openpage:function(e){
    console.log(e)
    if (e.currentTarget.dataset.ace =="+ 添加尺寸"){
      console.log("1")
      wx.navigateTo({
        url: '../../home/toorder/toorder',
       
      })
    }else{
      console.log("2")
      wx.navigateTo({
        url: '../../mine/size/mysize/mysize',
      })
    }
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

  }
})