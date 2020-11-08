//
//  StripeManager.m
//  eDance
//
//  Created by highjump on 2020/11/8.
//

#import "StripeManager.h"
#import <React/RCTBridgeModule.h>
#import <Stripe/Stripe.h>
#import "MyAPIClient.h"
#import "MainViewController.h"

@interface StripeManager() <RCTBridgeModule>

@end

@implementation StripeManager

static StripeManager *shared = nil;

NSString *gCustomerId = nil;
STPCustomerContext *customerContext = nil;

+ (id)shared {
  return shared;
}

- (id)init {
  self = [super init];
  
  shared = self;
  
  return self;
}

- (NSString *)getCustomerId {
  return gCustomerId;
}


// To export a module named SbDeskManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initCustomer:(NSString *)customerId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  gCustomerId = customerId;

  customerContext = [[STPCustomerContext alloc] initWithKeyProvider:[MyAPIClient new]];
}

RCT_EXPORT_METHOD(presentPaymentMethod:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  STPPaymentContext *context = [[STPPaymentContext alloc] initWithCustomerContext:customerContext];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    UINavigationController *nav = [UIApplication sharedApplication].delegate.window.rootViewController;
    
    // root view controller
    MainViewController *vcMain = (MainViewController *)[nav.viewControllers objectAtIndex:0];
    context.delegate = vcMain;
    
    context.hostViewController = nav;
    
    [context pushPaymentMethodsViewController];
  });

}

@end
