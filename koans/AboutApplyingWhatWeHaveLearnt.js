var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      
      productsICanEat = (products.filter(function(each){
        return !each.containsNuts && _(each.ingredients).all(function(ingredient){
          return ingredient !== 'mushrooms'
        });
      }));


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1000)).chain()
                            .filter(function (x) { return ((x % 5 == 0) || (x % 3 == 0)) })
                            .reduce(function (total, x) { return total + x })
                            .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var ingredientCount = _(products).chain()
                                 .map(function(x) { return x.ingredients })
                                 .flatten()
                                 .reduce(function(list, x) { 
                                    list[x] = (list[x] || 0) + 1;
                                    return list;
                                  }, {})
                                 .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    
    var largestPrimeFactor = function(num) {
      var remainder = num;
      var test = 2;
      while (test <= remainder) {
        if (remainder % test == 0) {
          remainder = remainder / test;
        }
        else {
          test += 1;
        }
      }
      return test;
    };
    expect(largestPrimeFactor(22530200)).toBe(19);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
    var palindrome = function(num) {
      chars = num.toString();
      chars = chars.split('');
      charsb = chars.slice().reverse();
      chars = chars.join()
      charsb = charsb.join()
      if (chars == charsb) { 
        return true; 
      }
      else { 
        return false; 
      }
    }


    var largestPalindrome= function() {
      var i;
      var j;
      var largest = 0;
      for (i = 100; i < 1000; i++) {
        for (j = 100; j < 1000; j++) {
          if ((palindrome(i*j)) && (largest < (i*j))) {
            largest = i*j;
          }
        }
      }
      return largest;

    }
    expect(largestPalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    
    var conversion = function (x) {
      var remainder = x;
      var i = 2;
      list = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      while (i <= remainder) {
        if (remainder % i == 0) {
          list[i] = (list[i] += 1);
          remainder = remainder / i;
        }
        else {
          i += 1;
        }
      }
      return list;
    };



    var smallestMultiple = function () {
      var i;
      var j;
      var z;
      var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var smallest = 1;
      for (i = 0; i <= 20; i++) {
        for (j= 1; j <= 20; j++) {
          if (conversion(i)[j] > num[j]) {
            num[j] = conversion(i)[j];
          }
        }
      }
      for (z = 1; z <= 20; z++) {
        while (num[z] >= 1) {
          smallest *= z;
          num[z] -= 1;
        }

      }
      return smallest;
        

    };

    expect(smallestMultiple()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    /* presuming that this is a shortened statement of the Euler problem 
    requiring the difference between sum of squares of the first natural numbers, 
    I've tested it with the first 10 natural numbers but it should work with any. */
    var sumSquares = function (nums) {
      var i;
      var sum = 0;
      for (i = 0; i < nums.length; i++) {
        sum += (nums[i]*nums[i]);
      }
      return sum;
    };

    var squareSum = function (nums) {
      var sum = nums.reduce(function (sum, x) { return sum + x});
      var sum = sum * sum;
      return sum;
    };

    var difference = function (nums) {
      return squareSum(nums) - sumSquares(nums);
    };

    expect(squareSum([1,2,3,4,5,6,7,8,9,10])).toBe(3025);
    expect(sumSquares([1,2,3,4,5,6,7,8,9,10])).toBe(385);
    expect(difference([1,2,3,4,5,6,7,8,9,10])).toBe(2640);
    expect(difference(_.range(1,101))).toBe(25164150);

  });

  it("should find the 10001st prime", function () {

    function isPrime (x) {
      var fail = 0;
      for (var i = 2; i < x; i++) {
        if (x % i == 0) {
          fail++;
        }
      }
      return fail == 0;
    }

    function primeList (x) {
      var list = [2];
      current = 3;
      while (list.length < x) {
        if (isPrime(current)) {
          list.push(current)
        }
        current++;
      }
      return list[x-1];
    }


    expect(isPrime(19)).toBe(true);
    expect(primeList(10001)).toBe(104743);
  });
  
});
