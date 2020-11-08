//
//  MainViewController.m
//  eDance
//
//  Created by highjump on 2020/11/8.
//

#import "MainViewController.h"
#import <Stripe/Stripe.h>
#import "StripeEventHandler.h"

@interface MainViewController () <STPPaymentContextDelegate>

@end

@implementation MainViewController

- (void)viewWillAppear:(BOOL)animated {
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)paymentContext:(nonnull STPPaymentContext *)paymentContext didCreatePaymentResult:(nonnull STPPaymentResult *)paymentResult completion:(nonnull STPErrorBlock)completion {
}

- (void)paymentContext:(nonnull STPPaymentContext *)paymentContext didFailToLoadWithError:(nonnull NSError *)error {
}

- (void)paymentContext:(nonnull STPPaymentContext *)paymentContext didFinishWithStatus:(STPPaymentStatus)status error:(nullable NSError *)error {
}

- (void)paymentContextDidChange:(nonnull STPPaymentContext *)paymentContext {
  NSString *label = paymentContext.selectedPaymentMethod.label;
  NSLog(@"--------------- paymentContextDidChange: %@", label);
 
  if ([paymentContext.selectedPaymentMethod isKindOfClass:[STPCard class]]) {
    STPCard *card = (STPCard *)paymentContext.selectedPaymentMethod;
    
    NSDictionary *dict = @{
      @"id": card.stripeID,
      @"brand": [STPCard stringFromBrand:card.brand] ,
      @"last4": card.last4,
    };
    
    [[StripeEventHandler shared] sendEventWithName:@"didChangePaymentMethod" body:dict];
  }
}

@end
